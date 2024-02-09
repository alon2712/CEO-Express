import React from 'react';

// Chakra imports
import { Box, Button, Card, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';


interface IdeaListProps {
    ideas: string[];
    currentIdea: string;
    updateIdea: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addIdea: () => void;
    deleteIdea: (index: number) => void;
}

export default function IdeaList(props: IdeaListProps) {
    // Chakra Color Mode
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorBrand = useColorModeValue('brand.500', 'white');

    const ideaEntries = props.ideas.map((idea, index) => (
        <div key={index} className="entry">
            <p>{idea}</p>
            <div className="seperator"></div>
            <button className="delete-button" type="button" onClick={() => props.deleteIdea(index)}>x</button>
        </div>));

    return (
        <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
            {/* Main Fields */}
            <Grid
                mb='20px'
                gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
                gap={{ base: '20px', xl: '20px' }}
                display={{ base: 'block', xl: 'grid' }}>
                <Flex flexDirection='column' gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}>
                <Flex direction='column'>
                    <div className="container">
                        <div className="ideationContainer">
                            <div className="entry-container">
                                {ideaEntries}
                            </div>
                            <div className="ideationInputContainer">
                                <input
                                    className="idea-input"
                                    type="text"

                                    value={props.currentIdea}
                                    onChange={props.updateIdea}
                                />
                                <button
                                    className="add-button"
                                    type="button" onClick={props.addIdea}
                                    disabled={!props.currentIdea}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    </Flex>
                </Flex>
                <Flex flexDirection='column' gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}>
                    <Card px='0px' mb='20px'>
                    </Card>
                    <Card p='0px'>
                        <Flex
                            align={{ sm: 'flex-start', lg: 'center' }}
                            justify='space-between'
                            w='100%'
                            px='22px'
                            py='18px'>
                            <Text color={textColor} fontSize='xl' fontWeight='600'>
                                History
                            </Text>
                            <Button variant='action'>See all</Button>
                        </Flex>

                    </Card>
                </Flex>
            </Grid>
            {/* Delete Product */}
        </Box>
    );
}
