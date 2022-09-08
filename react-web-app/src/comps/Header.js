import * as React from 'react';
import { ChakraProvider, Text, Link, Badge, Button, Box, Image, ColorModeScript, Show, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Hide } from '@chakra-ui/react';
import { NavLink } from "react-router-dom";
import theme from '../theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi';


function Header() {

    const [size, setSize] = React.useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClick = () => {
        onOpen()
    }
    

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
                        <NavLink to={'/admin/guilds'}>
                            <Link fontSize={30} fontWeight={700}>
                                Home
                            </Link>
                        </NavLink>

                        <Box w={10} />

                        <NavLink to={'/admin/commands'}>
                            <Link fontSize={30} fontWeight={700}>
                                About
                            </Link>
                        </NavLink>

                        <Box w={10} />

                        <NavLink to={'/admin/economy'}>
                            <Link fontSize={30} fontWeight={700}>
                                App
                            </Link>
                        </NavLink>
                    </DrawerBody>
                    </DrawerContent>
                </Drawer>
                </Show>
                
                <Hide breakpoint='(max-width: 580px)'>
                    <NavLink to={'/admin/guilds'}>
                        <Link mr={3}>
                            Home
                        </Link>
                    </NavLink>

                    <NavLink to={'/admin/commands'}>
                        <Link mr={3}>
                            About
                        </Link>
                    </NavLink>

                    <NavLink to={'/admin/economy'}>
                        <Link mr={3}>
                            App
                        </Link>
                    </NavLink>
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
                </Show>

                <Hide breakpoint='(max-width: 380px)'>

                <Text fontSize={25} ml={20} mr={2} fontWeight={800} mt={'-2.5'}>Bunky</Text>

                <Badge variant='solid' colorScheme='purple' mt={-1.5}>
                    Beta
                </Badge>
                </Hide>
            </Box>
      </Box>

    </ChakraProvider>
  );
}

export default Header;