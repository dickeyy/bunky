import * as React from 'react'
import { theme, Box, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, Heading, Text, Hide, Show, Input, } from '@chakra-ui/react'
import { FaDiscord } from 'react-icons/fa';
import { useSearchParams, useLocation } from "react-router-dom"

// Components
import Header from '../comps/Header';
import Footer from '../comps/Footer';

function HomePage() {

    const [isLoading, setLoading] = React.useState(false)
    const [isDisabled, setDisabled] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ email, setEmail ] = React.useState('')
    const cancelRef = React.useRef()

  return (
    <Box p={5} h={'fit-content'} flexDirection="column" bgGradient='linear(to-r, #6320EE, #8075FF, #7e59ca)'>

      <Header />

      <Show breakpoint='(max-width: 580px)'>
        <Heading fontSize={60} textAlign='center' p={0} pt={10} pb={20} color={'white'} fontWeight={700} mt={30}>The best way to find your next great roommate.</Heading>

        <Text textAlign='center' pr={55} pl={55} color={'gray.300'} fontWeight={600} fontSize={25}>With bunky, you can find people close to you with similar living patterns.</Text>
      </Show>

      <Hide breakpoint='(max-width: 580px)'>
        <Heading fontSize={80} textAlign='center' p={100} pt={10} pb={30} color={'white'} fontWeight={700} mt={30}>The best way to find your next great roommate.</Heading>

        <Text textAlign='center' pr={55} pl={55} color={'gray.300'} fontWeight={600} fontSize={25}>With bunky, you can find people close to you with similar living patterns.</Text>
      </Hide>

      <Box textAlign='center' pt={10} pb={20} justifyContent='center' flexDir={'row'}>

        {/* <Button 
          shadow={'lg'}
          color={'white'} 
          backgroundColor={'purple.600'} 
          fontSize={30} p={8} 
          fontWeight={700} 
          _hover={{backgroundColor: 'purple.800'}}
        >
          Download
        </Button> */}
        <Text
          color={'white'}
          fontSize={30}
          fontWeight={700}
          mb={5}
        >
          Get Updates
        </Text>

        <Input 
          placeholder="Enter your email"
          size="lg"
          width={'30vw'}
          color={'white'}
          _placeholder={{ color: 'gray.300' }}
          borderColor={'gray.300'}
          type="email"
          onChange={setEmail}
        />

        <Button
          shadow={'lg'}
          color={'white'}
          backgroundColor={'purple.600'}
          fontSize={20}
          mt={-2}
          p={6}
          fontWeight={700}
          _hover={{backgroundColor: 'purple.800'}}
          ml={5}
        >
          Sign Up
        </Button>

        <Box h={100} />

      </Box>

      <Footer />

    </Box>
  );
}

export default HomePage;