import * as React from 'react';
import IdeaEntry from './IdeaEntry';
// Chakra imports
import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';

interface IdeaListState {
    ideas: string[];
    currentIdea: string;
    history: HistoryType[];
    activePageId: string;
}

export default class IdeaList extends React.Component<{}, IdeaListState> {
    constructor(props: {}) {
        super(props);

        let historyList:HistoryType[] = [];
        for (let i = 0; i < 30; i++) {
            historyList.push({ name: "Test "+i, id: "test"+i })
          }


        this.state = {
            ideas: ["TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST"],
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
            ideas: [...this.state.ideas, this.state.currentIdea],
            currentIdea: ''
        });
    }

    deleteIdea(index: number) {
        const newIdeas = [...this.state.ideas];
        newIdeas.splice(index, 1);

        this.setState({ ideas: newIdeas });
    }

    render() {
        const ideaEntries = this.state.ideas.map((idea, index) => (
            <IdeaEntry ideaDescription='' ideaName={idea} ideaId='' index={index} deleteIdea={this.deleteIdea} />
        ));

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

<div className="container">
                <div className="ideationContainer">
                    <div className="entry-container">
                        {ideaEntries}
                    </div>
                    <div className="ideationInputContainer">
                    <input
                        className="idea-input"
                        type="text"
                        value={this.state.currentIdea}
                        onChange={this.updateIdea}
                    />
                    <button
                        className="add-button"
                        type="button" onClick={this.addIdea}
                        disabled={!this.state.currentIdea}
                    >
                        +
                    </button>
                </div>
                </div> 
            </div>
                </Box>
            </Box>
        );
    }
}
/*


*/
