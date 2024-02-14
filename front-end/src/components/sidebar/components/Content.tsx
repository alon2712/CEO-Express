// chakra imports
import { Box, Flex, Stack } from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import History from 'components/sidebar/components/History';
// FUNCTIONS

function SidebarContent(props: {history: HistoryType[], activeId: string,changeHistoryPage: (id: string) => void}) {
	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			<Stack direction='column' mt='8px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<History history={props.history} activeId={props.activeId}  changeHistoryPage={props.changeHistoryPage}/> 
					
				</Box>
			</Stack>

			<Box ps='20px' pe={{ lg: '16px', '2xl': '20px' }} mt='60px' mb='40px' borderRadius='30px'>
				<SidebarCard />
			</Box>
		</Flex>
	);
}

export default SidebarContent;
