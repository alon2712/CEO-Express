import * as React from 'react';
import { Grid, Card, Text, Portal, Button, Avatar, Link, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import Header from 'components/header/Header';
import IdeaCheckTable from './dataTables/components/IdeaCheckTable';
import Footer from 'footer/FooterIdeaAdd';
import axios from 'axios';
import { wait } from '@testing-library/user-event/dist/utils';
import { BallTriangle } from 'react-loader-spinner';
import StepByStep from './stepByStep/StepByStep';
import MarketGapTable from './dataTables/components/MarketGapTable';
import NameDescriptionIdea from './stepByStep/NameDescriptionIdea';

interface IdeaViewState {
    ideas: IdeaEntryType[];
    currentIdeaName: string;
    currentIdeaDescription: string;
    history: HistoryType[];
    activePage: HistoryType;
    ideasLoading: boolean;
    generateLoading: boolean;
    currentNewHistory: string;
    currentUserName: string;
    checkboxDict: { [id: string] : boolean }
    selectedIdea: IdeaEntryType;
}


export default class IdeaView extends React.Component<{}, IdeaViewState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            ideas: [],
            currentIdeaName: '',
            currentIdeaDescription: '',
            history: [],
            activePage: {Name: "", UserName:"", HistoryId:"" },
            ideasLoading: true,
            generateLoading: false,
            currentNewHistory: "",
            currentUserName: "",
            checkboxDict: {},
            selectedIdea: undefined
        };

        this.updateIdeaDescription = this.updateIdeaDescription.bind(this);
        this.updateIdeaName = this.updateIdeaName.bind(this);
        this.addIdeaEntry = this.addIdeaEntry.bind(this);
        this.deleteIdeaEntry = this.deleteIdeaEntry.bind(this);
        this.reload = this.reload.bind(this);
        this.reloadDontLoad = this.reloadDontLoad.bind(this);
        this.selectIdea = this.selectIdea.bind(this);
        this.deselectIdea = this.deselectIdea.bind(this);
        this.generateMore = this.generateMore.bind(this);
        this.updateHistoryName = this.updateHistoryName.bind(this);
        this.updateNewUsername = this.updateNewUsername.bind(this);
        this.updateCheckTable = this.updateCheckTable.bind(this);
        this.createNewHistory = this.createNewHistory.bind(this); 
    }

    componentDidMount() {
        axios.get('/getAllHistory')
            .then(response => {
                const data: HistoryType[] = JSON.parse(response.data.message);

                if (data != undefined && data.length > 0) {
                    axios.get('/getAllIdeaEntriesForHistory?HistoryID=' + data[0].HistoryId)
                        .then(response => {
                            const ideaData = JSON.parse(response.data.message);
                            let checkDict: {[id:string] : boolean} = {}
                            ideaData.forEach( (value: IdeaEntryType) => {
                                    checkDict[value.IdeaEntryId] = false
                              }); 
                            this.setState({ history: data, ideas: ideaData, activePage: data[0], ideasLoading: false,checkboxDict: checkDict  });
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

    changeHistoryPage = (page: HistoryType) => {
        this.setState({ ideas: [], activePage: page, ideasLoading: true, selectedIdea: undefined })

        axios.get('/getAllIdeaEntriesForHistory?HistoryID=' + page.HistoryId)
            .then(response => {
                const data = JSON.parse(response.data.message);

                this.setState({ ideas: data, ideasLoading: false, selectedIdea: undefined });
            })
            .catch(error => {
                console.error('Error getting all ideas:', error);
            });

    }

    selectIdea = (idea: IdeaEntryType) => {
        this.setState({ selectedIdea: idea })
    }

    deselectIdea = () => {
        console.log("here")
        this.setState({ selectedIdea: undefined })
    }

    reload = () => {
        this.setState({ ideasLoading: true });
        axios.get('/getAllIdeaEntriesForHistory?HistoryID=' + this.state.activePage.HistoryId)
            .then(response => {
                const data = JSON.parse(response.data.message);
                
                let checkDict: {[id:string] : boolean} = {}
                data.forEach( (value: IdeaEntryType) => {
                    if(this.state.checkboxDict[value.IdeaEntryId] !== undefined ){
                        checkDict[value.IdeaEntryId] = this.state.checkboxDict[value.IdeaEntryId]
                    }
                    else{
                        checkDict[value.IdeaEntryId] = false
                    }
                  }); 
                this.setState({ ideas: data, generateLoading: false, ideasLoading: false, checkboxDict: checkDict });
            })
            .catch(error => {
                this.setState({ generateLoading: false, ideasLoading: false })
                console.error('Error getting all ideas:', error);
            });
    }

    reloadDontLoad = () => {
        axios.get('/getAllIdeaEntriesForHistory?HistoryID=' + this.state.activePage.HistoryId)
            .then(response => {
                const data = JSON.parse(response.data.message);
                let checkDict: {[id:string] : boolean} = {}
                data.forEach( (value: IdeaEntryType) => {
                    if(this.state.checkboxDict[value.IdeaEntryId] !== undefined ){
                        checkDict[value.IdeaEntryId] = this.state.checkboxDict[value.IdeaEntryId]
                    }
                    else{
                        checkDict[value.IdeaEntryId] = false
                    }
                  }); 
                this.setState({ ideas: data, generateLoading: false, checkboxDict: checkDict });
            })
            .catch(error => {
                this.setState({ generateLoading: false, ideasLoading: false })
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

        
        if (this.state.currentIdeaDescription != '' && this.state.currentIdeaName != '') {
            this.setState({ currentIdeaDescription: '', currentIdeaName: '' })
            axios.post('/addIdeaEntry', {
                HistoryId: this.state.activePage.HistoryId,
                IdeaName: this.state.currentIdeaDescription,
                Description: this.state.currentIdeaName
            })
                .then(response => {
                    this.reloadDontLoad();
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }

    deleteIdeaEntry(IdeaEntryId: string) {
            axios.post('/deleteIdeaEntry', {
                IdeaEntryId: IdeaEntryId
            })
                .then(response => {
                    this.reloadDontLoad();
                })
                .catch(error => {
                    console.log(error);
                });
        

    }


    updateCheckTable(IdeaEntryId: string) {
        let checkDict: {[id:string] : boolean} = this.state.checkboxDict
        checkDict[IdeaEntryId] = !checkDict[IdeaEntryId]
        this.setState({  checkboxDict: checkDict });
   

    }

    updateHistoryName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ currentNewHistory: e.target.value });
    }

    updateNewUsername(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ currentUserName: e.target.value });
    }

    createNewHistory() {
        this.setState({ currentNewHistory: '', currentUserName: '' });
        axios.post('/createNewHistory', {
            HistoryName: this.state.currentNewHistory,
            userName: this.state.currentUserName
        })
            .then(response => {
                this.getHistory();
            })
            .catch(error => {
                console.log(error);
            });
    }


    generateMore() {

        if (!this.state.generateLoading) {
            


            let checkedItems: IdeaEntryType[] = []
            this.state.ideas.forEach( (value: IdeaEntryType) => {
                if(this.state.checkboxDict[value.IdeaEntryId]){
                    checkedItems.push(value)
                }
            }); 

            if(checkedItems.length === 0)
            {
                return;
            }
            this.setState({ generateLoading: true })
            var descriptionNameConcat = checkedItems.map(function (item) {
                return "(name: " + item.Name + "\n description:  " + item.Description + ")";
            }).join(",");
            console.log(descriptionNameConcat)
            axios.post('/getNewIdeas', {
                HistoryId: this.state.activePage.HistoryId,
                Ideas: descriptionNameConcat
            })
                .then(response => {
                    this.setState({ generateLoading: false })
                    console.log(response)
                    this.reload();
                })
                .catch(error => {
                    this.setState({ generateLoading: false })
                });
        }


    }
    render() {
        let data = this.state.ideas;
        if (this.state.ideasLoading) {
            data = [{
                IdeaEntryId: "",
                Name: "Loading...",
                Description: "",
                DomainName: "",
                HistoryId: "",
                IsGenerated: undefined,

            }]

        }
        else if (data.length == 0) {
            data = [{
                IdeaEntryId: "",
                Name: "No Ideas",
                Description: "",
                DomainName: "",
                HistoryId: "",
                IsGenerated: undefined,

            }]

        }
        return (
            <>

                <Box>

                    <Sidebar history={this.state.history} activePage={this.state.activePage} changeHistoryPage={this.changeHistoryPage} updateHistoryName={this.updateHistoryName} updateNewUsername={this.updateNewUsername} createNewHistory={this.createNewHistory} currentNewHistory={this.state.currentNewHistory} currentUserName={this.state.currentUserName}/>
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
                                <Header selectedIdea={this.state.selectedIdea} currentPage={this.state.activePage} deselectIdea={this.deselectIdea}/>
                            </Box>

                        </Portal>
                        {this.state.selectedIdea == undefined &&
                        <Portal>
                            <Box>
                                <Footer generateLoading={this.state.generateLoading} generateMore={this.generateMore} updateIdeaDescription={this.updateIdeaDescription} updateIdeaName={this.updateIdeaName} addIdeaEntry={this.addIdeaEntry} currentIdeaName={this.state.currentIdeaName} currentIdeaDescription={this.state.currentIdeaDescription} />
                            </Box>

                        </Portal>
    }
                        {this.state.selectedIdea == undefined ?
                        <Box mt='30px' mb='160px' mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
                            <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>



                                <IdeaCheckTable tableData={data} deleteIdeaEntry={this.deleteIdeaEntry} selectIdea={this.selectIdea} updateCheckTable={this.updateCheckTable} checkboxDict={this.state.checkboxDict}/>
                            </Box>
                        </Box> : 
                        <Box mt='30px' mb='160px' mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
                        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>

                        <NameDescriptionIdea name={this.state.selectedIdea.Name} description={this.state.selectedIdea.Description}/>
                       

                        <StepByStep />

                        
                            <MarketGapTable  tableData={data} deleteIdeaEntry={this.deleteIdeaEntry} updateCheckTable={this.updateCheckTable} checkboxDict={this.state.checkboxDict}/>
                        </Box>
                    </Box> 
                        }
                    </Box>
                </Box>



            </>
        );
    }
}