import React from 'react';

// chakra imports
import {
	Box,
	Flex,
	Drawer,
	DrawerBody,
	Icon,
	useColorModeValue,
	DrawerOverlay,
	useDisclosure,
	DrawerContent,
	DrawerCloseButton
} from '@chakra-ui/react';
import Content from 'components/sidebar/components/Content';


// Assets
import { IoMenuOutline } from 'react-icons/io5';

export default function Sidebar(props: {history: HistoryType[], activeId: string ,changeHistoryPage: (id: string, name: string) => void, updateHistoryName: (e: React.ChangeEvent<HTMLInputElement>) => void,  updateNewUsername: (e: React.ChangeEvent<HTMLInputElement>) => void, createNewHistory: () => void, currentNewHistory: string, currentUserName: string}) {

	let variantChange = '0.2s linear';
	let shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
	// Chakra Color Mode
	let sidebarBg = useColorModeValue('white', 'navy.800');
	let sidebarMargins = '0px';
	// SIDEBAR
	return (
		<Box display={{ sm: 'none', xl: 'block' }} position='fixed' minH='100%'>
			<Box
				bg={sidebarBg}
				transition={variantChange}
				w='300px'
				h='100vh'
				m={sidebarMargins}
				minH='100%'
				overflowX='hidden'
				boxShadow={shadow}>
	
						<Content history={props.history} activeId={props.activeId} changeHistoryPage={props.changeHistoryPage} updateHistoryName={props.updateHistoryName} updateNewUsername={props.updateNewUsername} createNewHistory={props.createNewHistory} currentHistoryName={props.currentNewHistory} currentUserName={props.currentUserName}/>
						
			</Box>
		</Box>
	);
}
