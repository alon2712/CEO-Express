import * as React from 'react';
import { Grid, Card, Text, Portal, Button, Avatar, Link, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import Navbar from 'components/header/Header';
import IdeaCheckTable from './dataTables/components/IdeaCheckTable';

interface IdeaViewState {
    ideas: RowObj[];
    currentIdea: string;
    history: HistoryType[];
    activePageId: string;
}

type RowObj = {
    name: [string, boolean];
};


export default class IdeaView extends React.Component<{}, IdeaViewState> {
    constructor(props: {}) {
        super(props);

        let historyList: HistoryType[] = [];
        for (let i = 0; i < 30; i++) {
            historyList.push({ name: "Test " + i, id: "test" + i })
        }

        let ideaList: RowObj[] = [];
        for (let i = 0; i < 100; i++) {
            ideaList.push({ name: ["Test " + i, true] })
        }

        this.state = {
            ideas: ideaList,
            currentIdea: '',
            history: historyList,
            activePageId: "test1"

        };

        this.updateIdea = this.updateIdea.bind(this);
        this.addIdea = this.addIdea.bind(this);
        this.deleteIdea = this.deleteIdea.bind(this);
    }

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

                <Sidebar history={this.state.history} activeId={this.state.activePageId} />
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
                            <Navbar />
                        </Box>
                    </Portal>
                    <Box mt='20px' mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
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
