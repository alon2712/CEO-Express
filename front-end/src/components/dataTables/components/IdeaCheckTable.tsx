import { Flex, Box, Table, Checkbox, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';



interface IdeaCheckTableType{
	tableData: IdeaEntryType[]
}




// const columns = columnsDataCheck;
export default function IdeaCheckTable(props: IdeaCheckTableType) {
	const columnHelper = createColumnHelper<IdeaEntryType>();
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const columns = [
		columnHelper.accessor('Name', {
			id: 'Name',
			header: () => (
				<Text color={textColor} fontWeight='700' fontSize='18px' mb="4px" lineHeight='100%'>
					IDEAS
				</Text>

			),
			cell: (info: any) => (
				<Flex align='center'>
					
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('Description', {
			id: 'Description',
			header: () => (

				<Text color={textColor} fontWeight='700' fontSize='18px' mb="4px" lineHeight='100%'>
					DESCRIPTION
				</Text>

			),
			cell: (info: any) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					{info.getValue()}
				</Text>
			)
		})
	];
	
	const widthColumns = ['35%', '65%']
	const table = useReactTable({
		data: props.tableData,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Box>
				<Table variant='simple' color='gray.500' mb='0px' mt="0px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header, index) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'
											width={widthColumns[index]}
											onClick={header.column.getToggleSortingHandler()}>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
												{flexRender(header.column.columnDef.header, header.getContext())}{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => {
							return (
								<Tr  w='100%'key={row.id}>
									
									{row.getVisibleCells().map((cell, index) => {
										return (
											<Td
												key={cell.id}
												width={widthColumns[index]}
												fontSize={{ sm: '14px' }}
												borderColor='transparent'>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Td>
										);
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Card>
	);
} 

//<Checkbox defaultChecked={info.getValue()[1]} colorScheme='brandScheme' me='10px' />
