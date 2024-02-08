/* eslint-disable */

import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';



export function SidebarHistory(props: {history: HistoryType[], activeId: string}) {
	//   Chakra color mode
	let activeColor = useColorModeValue('gray.700', 'white');
	let inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');

	const activeRoute = (historyId: string) => {
		return historyId === props.activeId;
	};

	const createLinks = (
		routes: HistoryType[], 
	) => {
		return routes.map(
			(
				historyEntry: HistoryType,
				index: number
			) => {
					return (


								<Box>
									<HStack
										spacing={activeRoute(historyEntry.id.toLowerCase()) ? '22px' : '26px'}
										py='5px'
										ps='10px'>
										<Text
											me='auto'
											color={activeRoute(historyEntry.id.toLowerCase()) ? activeColor : inactiveColor}
											fontWeight={activeRoute(historyEntry.id.toLowerCase()) ? 'bold' : 'normal'}>
											{historyEntry.name}
										</Text>
										<Box h='36px' w='4px' bg={activeRoute(historyEntry.id.toLowerCase()) ? 'brand.400' : 'transparent'} borderRadius='5px' />
									</HStack>
								</Box>
							
					);
				
			}
		);
	};
	//  BRAND
	return <>{createLinks(props.history)}</>
}

export default SidebarHistory;
