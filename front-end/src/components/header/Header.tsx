/* eslint-disable */
// Chakra Imports
import { Box, Button, Icon, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Link, Text, 
	useColorModeValue,
	useColorMode} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export default function Header(props: {}) {
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
    const navbarShadow = useColorModeValue('0px 0px 8px 8px  rgba(31,40,75, 0.1)', '0px 0px 6px 6px  rgba(117,81,255,0.25)');
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
		<Box
			position={navbarPosition}
			boxShadow={navbarShadow}
			bg={navbarBg}
			borderColor={navbarBorder}
			filter={navbarFilter}
			backdropFilter={navbarBackdrop}
			backgroundPosition='center'
			backgroundSize='cover'
			borderRadius='0px 0px 25px 25px'
			borderWidth='1.5px'
			borderStyle='solid'
			alignItems={{ xl: 'center' }}
			display={true ? 'block' : 'flex'}
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
			pt='36px'
			top={{ base: '0px', md: '0px', xl: '0px' }}
			w={{
				base: 'calc(100vw - 6%)',
				md: 'calc(100vw - 8%)',
				lg: 'calc(100vw - 6%)',
				xl: 'calc(100vw - 350px)',
				'2xl': 'calc(100vw - 365px)'
			}}>
			<Flex
				w='100%'
				alignItems={{ xl: 'center' }}
				mb={gap}>
				<Box w='max-content'>
					<Breadcrumb>
						<BreadcrumbItem color={secondaryText} fontSize='sm' mb='5px'>
							<BreadcrumbLink href='#' color={secondaryText}>
								Pages
							</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbItem color={secondaryText} fontSize='sm'>
							<BreadcrumbLink href='#' color={secondaryText}>
								Current Page
							</BreadcrumbLink>
						</BreadcrumbItem>
					</Breadcrumb>
					{/* Here we create navbar brand, based on route name */}
					<Link
						color={mainText}
						href='#'
						bg='inherit'
						borderRadius='inherit'
						fontWeight='bold'
						fontSize='34px'
						_hover={{ color: { mainText } }}
						_active={{
							bg: 'inherit',
							transform: 'none',
							borderColor: 'transparent'
						}}
						_focus={{
							boxShadow: 'none'
						}}>
						CEO Express
					</Link>
				</Box>
				<Box ms='auto' w='max-content'>
					<Button
						variant='no-hover'
						bg='transparent'
						p='0px'
						minW='unset'
						minH='unset'
						
						w='max-content'
						onClick={toggleColorMode}>
						<Icon
							me='10px'
							h='18px'
							w='18px'
							color={navbarIcon}
							as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
						/>
					</Button>

				</Box>
			</Flex>
		</Box>
	);
}
