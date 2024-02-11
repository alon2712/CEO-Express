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
type RowObj = {
	name: [string, boolean];
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function IdeaCheckTable(props: { tableData: any }) {
	const { tableData } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text color={textColor} fontWeight='700' fontSize='18px' mb="4px" lineHeight='100%'>
					IDEAS
				</Text>

			),
			cell: (info: any) => (
				<Flex align='center'>
					<Checkbox defaultChecked={info.getValue()[1]} colorScheme='brandScheme' me='10px' />
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()[0]}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (

				<Text color={textColor} fontWeight='700' fontSize='18px' mb="4px" lineHeight='100%'>
					Description
				</Text>

			),
			cell: (info: any) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (

				<Text color={textColor} fontWeight='700' fontSize='18px' mb="4px" lineHeight='100%'>
					Actions
				</Text>

			),
			cell: (info: any) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					todo: add button
				</Text>
			)
		})
	];
	
	const widthColumns = ['20%', '60%', '20%']
	const [data, setData] = React.useState(() => [...defaultData]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	{console.log(table.getRowModel())}
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