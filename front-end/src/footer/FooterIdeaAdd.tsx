/* eslint-disable */
// Chakra Imports
import {
    Box, Button, Icon, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Link, Text,
    useColorModeValue,
    useColorMode,
    InputGroup,
    InputLeftElement,
    Input,
    IconButton,
    Textarea
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export default function FooterIdeaAdd(props: {}) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', changeNavbar);

        return () => {
            window.removeEventListener('scroll', changeNavbar);
        };
    });
    const { colorMode, toggleColorMode } = useColorMode();
    // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
    let mainText = useColorModeValue('navy.700', 'white');
    let secondaryText = useColorModeValue('gray.700', 'white');
    let navbarPosition = 'fixed' as const;
    let navbarFilter = 'none';
    let navbarBackdrop = 'blur(10px)';
    const navbarIcon = useColorModeValue('gray.400', 'white');
    const navbarShadow = useColorModeValue('0px 0px 8px 8px  rgba(31,40,75,0.1)', '0px 0px 6px 6px  rgba(117,81,255,0.25)');
    let navbarBg = useColorModeValue('rgba(244, 247, 254, 1)', 'rgba(31,40,75,1)');
    let navbarBorder = 'transparent';
    let secondaryMargin = '0px';
    let paddingX = '15px';
    let gap = '0px';
    const changeNavbar = () => {
        if (window.scrollY > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    return (
        <Box>

            <Box
                backgroundColor="#F8F8F8"
                borderTop="1px solid #E7E7E7"
                textAlign="center"
                padding="20px"
                position="fixed"
                bottom="0"
                height="140px"
                boxShadow={navbarShadow}
                bg={navbarBg}
                borderColor={navbarBorder}
                filter={navbarFilter}
                backdropFilter={navbarBackdrop}
                backgroundPosition='center'
                backgroundSize='cover'
                borderRadius='25px 25px 0px 0px'
                borderWidth='1.5px'
                borderStyle='solid'
                alignItems={{ xl: 'center' }}
                display={false ? 'block' : 'flex'}
                minH='75px'
                justifyContent={{ xl: 'center' }}
                lineHeight='25.6px'
                mx='auto'
                mt={secondaryMargin}
                pb='16px'
                right={{ base: '4px', md: '22px', lg: '26px', xl: '30px' }}

                px={{
                    sm: paddingX,
                    md: '10px'
                }}
                ps={{
                    xl: '12px'
                }}
                pt='0px'
                w={{
                    base: 'calc(100vw - 6%)',
                    md: 'calc(100vw - 8%)',
                    lg: 'calc(100vw - 6%)',
                    xl: 'calc(100vw - 350px)',
                    '2xl': 'calc(100vw - 365px)'
                }}>
                <Box
                    w='100%'
                    ml="5px"
                    mr="5px"
                    mt="20px"
                    mb="auto"
                    h="100px">
                    <Textarea
                        h="100%"
                        isRequired={true}
                        fontWeight='500'
                        color={useColorModeValue('navy.700', 'white')}
                        _placeholder={{ color: 'secondaryGray.600', fontWeight: '500' }}
                        bg={useColorModeValue('transparent', 'transparent')}
                        border='1px solid'
                        paddingTop='10px'
                        paddingLeft='15px'
                        resize='none'
                        borderColor={useColorModeValue('secondaryGray.100', 'rgba(135, 140, 189, 0.3)')}
                        borderRadius='16px'
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        placeholder='Your idea description...'
                        mb='24px'
                        size='lg' />
                </Box>
                <Box
                    w='100%'
                    ml="5px"
                    mr="5px"
                    mb="auto"
                    mt="20px"
                    h="100px"

                >
                    <Input
                        isRequired={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        type='email'
                        placeholder='Your idea name...'
                        fontWeight='500'
                        size='lg'
                    />
                    <Box
                        mt="auto"
                        w='100%'
                        p="10px"
                        display='flex'
                        justifyContent='space-between'>

                            <Button
                                fontSize='sm'
                                variant='brand'
                                fontWeight='500'
                                h='40px'
                                w='40%'>
                                Add
                            </Button>
                        

                            <Button
                                fontSize='sm'
                                variant='brand'
                                fontWeight='500'
                                w='58%'
                                h='40px'>
                                Generate More
                            </Button>
                        

                    </Box>
                </Box>

            </Box>
        </Box>
    );
}


