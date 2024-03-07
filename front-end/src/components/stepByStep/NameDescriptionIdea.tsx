import React from 'react';
import { Box, Button, Card, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';

export default function NameDescriptionIdea(props: {description: string, name: string, isGenerated:number}) {
    const textColor = useColorModeValue('navy.700', 'white');
    const bgItem = useColorModeValue('white', 'navy.700');
    return (

        <>
        <Card borderColor="black" bg={bgItem} mt="5px" px='24px' py='21px' >
        <Flex
            align={{ sm: 'flex-start', lg: 'center' }}
            justify='space-between'
            w='100%'
            
            >
            <Text color={textColor} fontSize='xl' fontWeight='600'>					
            {props.isGenerated && 
					<UnlockIcon color="teal" mr='5px' mt='-3px' />}
            {props.name}
            </Text>
        </Flex>
        </Card>
        
        <Card borderColor="black" bg={bgItem} mt="10px" px='24px' py='21px' >
            <Flex direction={{ base: 'column' }} justify='center'>
                <Flex position='relative' align='center'>
                    <Text
                        color='secondaryGray.600'
                        fontSize={{
                            base: 'sm'
                        }}
                        fontWeight='400'
                        me='14px'
                        >
                            {props.description}
                    </Text>
                </Flex>

            </Flex>
        </Card> </>


    );

}
