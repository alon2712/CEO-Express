import * as React from 'react';
import { Grid, Card, Text, Portal, Button, Avatar, Link, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import Header from 'components/header/Header';
import IdeaCheckTable from './dataTables/components/IdeaCheckTable';
import Footer from 'footer/FooterIdeaAdd';
import axios from 'axios';
import { wait } from '@testing-library/user-event/dist/utils';

interface IdeaViewState {
    ideas: RowObj[];
    currentIdea: string;
    history: HistoryType[];
    activePageId: string;
    historyMap: {historyName : string, historyID: string}[];
}
// interface HistoryMap {
//     [historyID: string]: string;
//   }

type RowObj = {
    name: [string, boolean];
};


export default class IdeaView extends React.Component<{}, IdeaViewState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            ideas: [],
            currentIdea: '',
            history: [],
            activePageId: "test1",
            historyMap: []
        };
        
        

    
        this.getHistory();
        
        
        // for (let i = 0; i < this.state.historyMap.length; i++) {
        //     historyList.push({ name: this.state.historyMap[i].historyName, id: this.state.historyMap[i].historyID})
        // }

        let ideaList: RowObj[] = [];
        for (let i = 0; i < 100; i++) {
            ideaList.push({ name: ["Test " + i, true] })
        }

        

        this.updateIdea = this.updateIdea.bind(this);
        this.addIdea = this.addIdea.bind(this);
        this.deleteIdea = this.deleteIdea.bind(this);
    }

    getHistory = () => {
        let map : {historyName : string, historyID: string}[] = [{historyName: "", historyID: ""}];
        axios.get('/getAllHistory')
          .then(response => {
            const data = JSON.parse(response.data.message);
            //const historyMap: HistoryMap = data;
            map = Object.keys(data).map(historyID => ({
                historyName: data[historyID],
                historyID
              }));
            this.setState({ historyMap: map }, () => {
                this.processHistoryMap();
            });
          })
          .catch(error => {
            console.error('Error getting history:', error);
          });
      };
    getAllIdeas = (id: string) => {
        axios.get('/getAllIdeaEntriesForHistory?HistoryID='+id)
        .then(response => {
            const data = response.data;
            console.log("DATA BELOW:")
            console.log(data);
        })
        .catch(error => {
          console.error('Error getting all ideas:', error);
     });
    }
      processHistoryMap = () => {
        let historyList: HistoryType[] = [];
        for (let i = 0; i < this.state.historyMap.length; i++) {
            historyList.push({ name: this.state.historyMap[i].historyName, id: this.state.historyMap[i].historyID })
        }
        console.log("HISTORY LIST BELOW IN PROCESS:");
        console.log(historyList);
        this.setState({ history: historyList });
    };
    

    updateIdea(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ currentIdea: e.target.value });
    }

    addIdea() {
        this.setState({
            ideas: [...this.state.ideas, {name: [this.state.currentIdea, true]}],
            currentIdea: ''
        });
    }

    deleteIdea(index: number) {
        const newIdeas = [...this.state.ideas];
        newIdeas.splice(index, 1);

        this.setState({ ideas: newIdeas });
    }

    render() {

        return (
            <Box>

                <Sidebar history={this.state.history} activeId={this.state.activePageId}/>
                <Box
                    float='right'
                    minHeight='100vh'
                    height='100%'
                    overflow='auto'
                    position='relative'
                    maxHeight='100%'
                    w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                    maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
                    transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
                    transitionDuration='.2s, .2s, .35s'
                    transitionProperty='top, bottom, width'
                    transitionTimingFunction='linear, linear, ease'>
                    <Portal>
                        <Box>
                            <Header />
                        </Box>
                        
                    </Portal>
                    <Portal>
                        <Box>
                            <Footer />
                        </Box>
                        
                    </Portal>
                    <Box mt='30px' mb='160px' mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
                        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
                            <IdeaCheckTable tableData={this.state.ideas} />
                        </Box>
                    </Box>

                </Box>
            </Box>
        );
    }
}
/*

                    <IdeaList addIdea={this.addIdea} currentIdea={this.state.currentIdea} updateIdea={this.updateIdea} ideas={this.state.ideas} deleteIdea={this.deleteIdea}/>

*/

