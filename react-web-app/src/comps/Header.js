import * as React from 'react';
import { ChakraProvider, Text, Link, Badge, Button, Box, Image, ColorModeScript, Show, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Hide } from '@chakra-ui/react';
import { NavLink, useLocation } from "react-router-dom";
import Logo from  '../assets/app-logo-06.png'
import theme from '../theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi';


function Header() {

    const [size, setSize] = React.useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClick = () => {
        onOpen()
    }

    const location = useLocation();

    const [isHome, setIsHome] = React.useState(false)
    const [isAbout, setIsAbout] = React.useState(false)
    const [isApp, setIsApp] = React.useState(false)

    React.useEffect(() => {
        if (location.pathname === '/') {
            setIsHome(true)
            setIsAbout(false)
            setIsApp(false)
        } else if (location.pathname === '/about') {
            setIsHome(false)
            setIsAbout(true)
            setIsApp(false)
        } else if (location.pathname === '/app') {
            setIsHome(false)
            setIsAbout(false)
            setIsApp(true)
        }
    }, [location])

  return (
    <ChakraProvider backgroundColor={'#1A202C'} justifyContent={'center'}>
        
      <Box 
        w={'90vw'} 
        p={'1.5rem'}
        pb={'3rem'}
        position={"sticky"}
        top={'0'}
        height={'fit-content'}
        backgroundColor={'rgba(180, 180, 180, 0.2)'}
        backdropFilter={'blur(10px)'}
        boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
        borderRadius={'13px'}
        margin={'1rem auto'}
        >
            <Box
                width={'100%'}
                justifyContent={'right'}
                right={'30px'}
                position={'absolute'}
                alignItems={'flex-end'}
                mt={-3}
                alignSelf={'center'}
                textAlign={'right'}
            >   

                <Show breakpoint='(max-width: 580px)'>
                <Button
                    onClick={() => handleClick(size)}
                    key={size}
                    pr={1}
                    leftIcon={<GiHamburgerMenu />} 
                    ></Button>

                <Drawer onClose={onClose} isOpen={isOpen} size={'xs'}>
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize={50} fontWeight={700}>Menu</DrawerHeader>
                    <DrawerBody>
                        <NavLink to={'/'}>
                            <Link fontSize={30} fontWeight={700}>
                                Home
                            </Link>
                        </NavLink>

                        <Box w={10} />

                        {/* <NavLink to={'/about'}>
                            <Link fontSize={30} fontWeight={700}>
                                About
                            </Link>
                        </NavLink>

                        <Box w={10} />

                        <NavLink to={'/app'}>
                            <Link fontSize={30} fontWeight={700}>
                                App
                            </Link>
                        </NavLink> */}
                    </DrawerBody>
                    </DrawerContent>
                </Drawer>
                </Show>
                
                <Hide breakpoint='(max-width: 580px)'>

                    {isHome ? (
                        
                        <>
                        <NavLink to={'/'}>
                            <Link mr={2} p={3} color={'white'} borderRadius={10} backgroundColor={'#6320EE'} fontWeight={800} _hover={{textDecoration:"none"}}>
                                Home
                            </Link>
                        </NavLink>

                        {/* <NavLink to={'/about'}>
                            <Link mr={2} p={3} color={'white'} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                About
                            </Link>
                        </NavLink>

                        <NavLink to={'/app'}>
                            <Link mr={2} p={3} color={'white'} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                App
                            </Link>
                        </NavLink> */}
                        </>

                    ) : isAbout ? (
                        <>
                        <NavLink to={'/'}>
                            <Link mr={2} p={3} color={'white'} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                Home
                            </Link>
                        </NavLink>

                        {/* <NavLink to={'/about'}>
                            <Link mr={2} p={3} color={'white'} borderRadius={10} backgroundColor={'purple.700'} fontWeight={800} _hover={{textDecoration:"none"}}>
                                About
                            </Link>
                        </NavLink>

                        <NavLink to={'/app'}>
                            <Link mr={2} p={3} color={'white'} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                App
                            </Link>
                        </NavLink> */}
                        </>

                    ) : isApp ? (

                        <>
                        <NavLink to={'/'}>
                            <Link mr={2} p={3} color={'white'} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                Home
                            </Link>
                        </NavLink>

                        {/* <NavLink to={'/about'}>
                            <Link mr={2} p={3}  color={'white'} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                About
                            </Link>
                        </NavLink>

                        <NavLink to={'/app'}>
                            <Link mr={2} p={3} color={'white'} borderRadius={10} backgroundColor={'purple.700'} fontWeight={800} _hover={{textDecoration:"none"}}>
                                App
                            </Link>
                        </NavLink> */}
                        </>

                    ) : (

                        <>
                        <NavLink to={'/'}>
                            <Link mr={2} p={3} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                Home
                            </Link>
                        </NavLink>

                        {/* <NavLink to={'/about'}>
                            <Link mr={2} p={3} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                About
                            </Link>
                        </NavLink>

                        <NavLink to={'/app'}>
                            <Link mr={2} p={3} _hover={{ color: "purple.300", backgroundColor: 'whiteAlpha.100', borderRadius: 10}}>
                                App
                            </Link>
                        </NavLink> */}
                        </>
                    )}
                </Hide>

                
                <ColorModeSwitcher />

                
            </Box>

            <Box
                width={'20%'}
                justifyContent={'left'}
                left={'10px'}
                position={'absolute'}
                alignItems={'center'}
                display={'flex'}
                flexDirection={'row'}
            >

                <Show breakpoint='(max-width: 380px)'>
                    <NavLink to={'/'}>
                        <Link>
                            <a>
                                <Image w={'45px'} mt={'-15px'} justifyContent={'left'} pos={'absolute'} left={'10px'} alignItems={'center'} src={Logo} alt='logo' />
                            </a>
                        </Link>
                    </NavLink>
                </Show>

                <Hide breakpoint='(max-width: 380px)'>

                <NavLink to={'/'}>
                    <Link>
                        <a>
                            <Image w={'45px'} mt={'-25px'} justifyContent={'left'} pos={'absolute'} left={'20px'} alignItems={'center'} src={Logo} alt='logo' />
                        </a>
                    </Link>
                </NavLink>

                <Text fontSize={25} color={'white'} ml={20} mr={2} fontWeight={800} mt={'-2'}>bunky</Text>
                </Hide>
            </Box>
      </Box>

    </ChakraProvider>
  );
}

export default Header;