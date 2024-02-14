import * as React from 'react';
import { Grid, Card, Text, Portal, Button, Avatar, Link, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import Header from 'components/header/Header';
import IdeaCheckTable from './dataTables/components/IdeaCheckTable';
import Footer from 'footer/FooterIdeaAdd';
import axios from 'axios';
import { wait } from '@testing-library/user-event/dist/utils';

interface IdeaViewState {
    ideas: IdeaEntryType[];
    currentIdeaName: string;
    currentIdeaDescription: string;
    history: HistoryType[];
    activePageId: string;
}


export default class IdeaView extends React.Component<{}, IdeaViewState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            ideas: [],
            currentIdeaName: '',
            currentIdeaDescription: '',
            history: [],
            activePageId: ""
        };

        this.updateIdeaDescription = this.updateIdeaDescription.bind(this);
        this.updateIdeaName = this.updateIdeaName.bind(this);
        this.addIdeaEntry = this.addIdeaEntry.bind(this);
        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        axios.get('/getAllHistory')
            .then(response => {
                const data: HistoryType[] = JSON.parse(response.data.message);

                if (data != undefined && data.length > 0) {
                    axios.get('/getAllIdeaEntriesForHistory?HistoryID=' + data[0].HistoryId)
                        .then(response => {
                            const ideaData = JSON.parse(response.data.message);

                            this.setState({ history: data, ideas: ideaData, activePageId: data[0].HistoryId });
                        })
                        .catch(error => {
                            console.error('Error getting all ideas:', error);
                        });
                }
                else {
                    this.setState({ history: data });
                }
            })
            .catch(error => {
                console.error('Error getting history:', error);
            });
    }

    getHistory = () => {
        axios.get('/getAllHistory')
            .then(response => {
                const data = JSON.parse(response.data.message);

                this.setState({ history: data });
            })
            .catch(error => {
                console.error('Error getting history:', error);
            });
    }

    changeHistoryPage = (id: string) => {
        this.setState({ ideas: [], activePageId: id })

        axios.get('/getAllIdeaEntriesForHistory?HistoryID=' + id)
            .then(response => {
                console.log(response.data)
                const data = JSON.parse(response.data.message);

                console.log(data)
                this.setState({ ideas: data });
            })
            .catch(error => {
                console.error('Error getting all ideas:', error);
            });
    }

    reload = () => {

        axios.get('/getAllIdeaEntriesForHistory?HistoryID=' + this.state.activePageId)
            .then(response => {
                console.log(response.data)
                const data = JSON.parse(response.data.message);

                console.log(data)
                this.setState({ ideas: data });
            })
            .catch(error => {
                console.error('Error getting all ideas:', error);
            });
    }
    updateIdeaName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ currentIdeaName: e.target.value });
    }

    updateIdeaDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ currentIdeaDescription: e.target.value });
    }

    addIdeaEntry() {
        this.setState({ currentIdeaDescription: '', currentIdeaName: '' })
        if (this.state.currentIdeaDescription != '' && this.state.currentIdeaName != '') {
            axios.post('/addIdeaEntry', {
                HistoryId: this.state.activePageId,
                IdeaName: this.state.currentIdeaDescription,
                Description: this.state.currentIdeaName
            })
                .then(response => {
                    console.log(response)
                    this.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

    render() {
        return (
            <Box>

                <Sidebar history={this.state.history} activeId={this.state.activePageId} changeHistoryPage={this.changeHistoryPage} />
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
                            <Footer updateIdeaDescription={this.updateIdeaDescription} updateIdeaName={this.updateIdeaName} addIdeaEntry={this.addIdeaEntry} currentIdeaName={this.state.currentIdeaName} currentIdeaDescription={this.state.currentIdeaDescription} />
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

