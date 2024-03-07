import React from 'react';
import { Box, Button, Card, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

export default function StepByStep(props: {stepByStepPlan: StepByStepEntry[]}) {

    const textColor = useColorModeValue('navy.700', 'white');
    const textColorBid = useColorModeValue('brand.500', 'white');
    const bgItem = useColorModeValue('white', 'navy.700');
    if(props.stepByStepPlan === undefined)
    {
        return(
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
                                Steps Loading... (please wait up to 3 minutes)
                        </Text>
                    </Flex>

                </Flex>
            </Card>

   
   </>
   );
    }
    if(props.stepByStepPlan.length === 0)
    {
        return(
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
                                Sorry! :( Steps could not be created for this idea...
                        </Text>
                    </Flex>

                </Flex>
            </Card>

   
   </>
   );
    }

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
            {props.stepByStepPlan.map((value)=>{return(
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
                            dangerouslySetInnerHTML={{ __html: value.Description}}>
                        </Text>
                    </Flex>

                </Flex>
            </Card>
)})}
   
   </>



    );

}
