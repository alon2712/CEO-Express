// chakra imports
import { Box, Flex, Stack, Button, Center, Input, CloseButton } from '@chakra-ui/react';
import { useState } from 'react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import History from 'components/sidebar/components/History';
// FUNCTIONS

function SidebarContent(props: 
	{history: HistoryType[], activeId: string, changeHistoryPage: (id: string, name: string) => void, updateHistoryName: (e: React.ChangeEvent<HTMLInputElement>) => void, updateNewUsername: (e: React.ChangeEvent<HTMLInputElement>) => void, createNewHistory: () => void, currentHistoryName: string, currentUserName: string}) {
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
	
	
	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			
			<Stack direction='column' mt='8px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }} style={{ height: '72vh', overflowY: 'scroll'}}>
					<History history={props.history} activeId={props.activeId} changeHistoryPage={props.changeHistoryPage} />
				</Box>
			</Stack>

			{/* I dont get the point of this, doesnt do anything
			<Box ps='20px' pe={{ lg: '16px', '2xl': '20px' }} mt='00px' mb='40px' borderRadius='30px'>
				<SidebarCard/>	
			</Box> */}

            {!isCreatingNewHistory ? (
                <Flex justify='center'>
                    <Button onClick={handleAddHistoryClick} variant="outline" borderRadius='30px' width='250px' mb='24px'>
                        Add History
                    </Button>
                </Flex>
            ) : (
                <Flex direction="column" alignItems="center">
						<form>
							<Input
								placeholder="Enter history name"
								textColor={'white'}
								value={props.currentHistoryName}
								onChange={props.updateHistoryName}
								mb={4}
								required={true}

							/>
							<Input
								placeholder="Enter Username"
								textColor={'white'}
								value={props.currentUserName}
								onChange={props.updateNewUsername}
								mb={2}
								required={true}
							/>
							<Flex justifyContent="center">
								<Button onClick={handleAddHistoryClick} mr={2} mb='24px'>Create</Button>
								<CloseButton onClick={handleCancelClick} />
							</Flex>

						</form>
                </Flex>
            )}
        </Flex>
    );
			
		//</Flex>
	//);
}

export default SidebarContent;
