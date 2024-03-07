import React from 'react';
import { Box, Button, Card, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export default function StepByStep(props: {}) {

    const textColor = useColorModeValue('navy.700', 'white');
    const textColorBid = useColorModeValue('brand.500', 'white');
    const bgItem = useColorModeValue('white', 'navy.700');
    const directions: string[] = ["1. step 1</br></br><a>test</a>","2. step 2","3. step 3","4. step 4"]
    return (

<><Card borderColor="black" bg={bgItem} mt="40px" px='24px' py='21px' >
            <Flex
                align={{ sm: 'flex-start', lg: 'center' }}
                justify='space-between'
                w='100%'
                
                >
                <Text color={textColor} fontSize='xl' fontWeight='600'>
                    Here's how you could get started...
                </Text>
            </Flex>
            </Card>
            {directions.map((value)=>{return(
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
                            dangerouslySetInnerHTML={{ __html: value}}>
                        </Text>
                    </Flex>

                </Flex>
            </Card>
)})}
   
   </>



    );

}
