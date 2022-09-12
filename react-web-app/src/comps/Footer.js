import * as React from 'react';
import { ChakraProvider, Text, Link, Badge, Button, Box, Image, ColorModeScript, Show, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Hide, Icon } from '@chakra-ui/react';
import { NavLink } from "react-router-dom";
import Logo from  '../assets/app-logo-06.png'
import theme from '../theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi';
import { FaTwitter } from 'react-icons/fa'


function Footer() {

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
        bottom={'0'}
        height={'fit-content'}
        backgroundColor={'rgba(180, 180, 180, 0.2)'}
        backdropFilter={'blur(10px)'}
        boxShadow={'rgba(28, 28, 28, 0.2) 0px 0px 10px'}
        borderRadius={'13px'}
        margin={'auto'}
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
            <a href='https://twitter.com/bunkyapp' target="_blank">
                <Icon as={FaTwitter} w={8} h={8} mt={2.5} mr={5} color={'whiteAlpha.700'} />
            </a>

                
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

                    <NavLink to={'/'}>
                        <Link pos={'absolute'} left={'10px'} ml={5}>
                            <Text>Terms</Text>
                        </Link>
                    </NavLink>
                    <NavLink to={'/'}>
                        <Link pos={'absolute'} left={'75px'} ml={5}>
                            <Text>Privacy</Text>
                        </Link>
                    </NavLink>

                <Hide breakpoint='(max-width: 380px)'>
                </Hide>
            </Box>
      </Box>

    </ChakraProvider>
  );
}

export default Footer;