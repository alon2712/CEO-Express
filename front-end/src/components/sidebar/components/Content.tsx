// chakra imports
import { Box, Flex, Stack, Button, Center, Input, CloseButton, useColorModeValue,
    useColorMode, } from '@chakra-ui/react';
import { useState } from 'react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import History from 'components/sidebar/components/History';
// FUNCTIONS

function SidebarContent(props: 
	{history: HistoryType[], activePage: HistoryType, changeHistoryPage: (page: HistoryType) => void, updateHistoryName: (e: React.ChangeEvent<HTMLInputElement>) => void, updateNewUsername: (e: React.ChangeEvent<HTMLInputElement>) => void, createNewHistory: () => void, currentHistoryName: string, currentUserName: string}) {
	//let isCreatingNewHistory = useState(false);
	const [isCreatingNewHistory, setIsCreatingNewHistory] = useState(false);

	const handleAddHistoryClick = () => {
		if (!isCreatingNewHistory){
			setIsCreatingNewHistory(true);
		}else{
			// Call function to add history in database
			if (props.currentHistoryName.trim() === '' || props.currentUserName.trim() === '') {
				return;
			}
			props.createNewHistory();
			setIsCreatingNewHistory(false);
		}
	}
	const handleCancelClick = () => {
		if (isCreatingNewHistory){
			setIsCreatingNewHistory(false);
		}
	}

	const { colorMode, toggleColorMode } = useColorMode();
    // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
    let mainText = useColorModeValue('navy.700', 'white');
    let secondaryText = useColorModeValue('gray.700', 'white');
    let navbarPosition = 'fixed' as const;
    let navbarFilter = 'none';
    let navbarBackdrop = 'blur(10px)';
    const navbarIcon = useColorModeValue('gray.400', 'white');
    const navbarShadow = useColorModeValue('0px 0px 4px 4px  rgba(31,40,75,0.05)', '0px 0px 3px 3px  rgba(117,81,255,0.125)');
    let navbarBg = useColorModeValue('rgba(244, 247, 254, 1)', 'rgba(31,40,75,1)');
    let navbarBorder = 'transparent';
    let secondaryMargin = '0px';
    let paddingX = '15px';
    let gap = '0px';
	
	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			
			<Stack direction='column' mt='8px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }} pb="100px" >
					<History history={props.history} activePage={props.activePage} changeHistoryPage={props.changeHistoryPage} />
				
					</Box>
			</Stack>

			{/* I dont get the point of this, doesnt do anything
			<Box ps='20px' pe={{ lg: '16px', '2xl': '20px' }} mt='00px' mb='40px' borderRadius='30px'>
				<SidebarCard/>	
			</Box> */}

            {!isCreatingNewHistory ? (
                <Flex justify='center ' position="fixed" bottom="0px" ml="16px">
                    <Button variant="brand" onClick={handleAddHistoryClick} borderRadius='30px' width='250px' mb='24px'>
                        Add BrainList
                    </Button>
                </Flex>
            ) : (

					            <Box
								position="fixed" bottom="0px"
								ml="6px"
                backgroundColor="#F8F8F8"
                borderTop="1px solid #E7E7E7"
                textAlign="center"
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
>                <Flex  						mt="10px"		ml="10px"
								mr="10px"
								direction="column" alignItems="center">
							<Input
								placeholder="Enter List Name"
								textColor={'white'}
								value={props.currentHistoryName}
								onChange={props.updateHistoryName}
								

								mb="4px"
								variant="auth"
								required={true}

							/>
							<Input
								placeholder="Enter Your Name"
								textColor={'white'}
								value={props.currentUserName}
								onChange={props.updateNewUsername}
								ml="20px"
								mr="20px"
								mb="16px"
								variant="auth"
								required={true}
							/>
							<Flex justifyContent="center">
								<Button onClick={handleAddHistoryClick} variant="brand" mr="10px" mb='14px'>Create</Button>
								<CloseButton mt='4px' onClick={handleCancelClick} />
							</Flex>
							</Flex>
							</Box>
               
            )}

        </Flex>
    );
			
		//</Flex>
	//);
}

export default SidebarContent;
