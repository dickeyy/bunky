import * as React from 'react'
import { theme, Box, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, Heading, Text, Hide, Show, Input, InputGroup, InputRightElement, } from '@chakra-ui/react'
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

    React.useEffect(() => {
      document.title = 'Coming Soon | Bunky';
    });

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

      <Box textAlign='center' pt={10} pb={20} justifyContent='center' flexDir={'row'} pr={'4rem'} pl={'4rem'}>

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

        <InputGroup size='lg'>
          <Input
            placeholder="Email (hello@bunky.app)"
            size="lg"
            // width={'30vw'}
            color={'white'}
            _placeholder={{ color: 'gray.400' }}
            type="email"
            onChange={setEmail}
            disabled={true}
          />
          <InputRightElement width='5.5rem'>
            <Button mr={1} disabled={true}>
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>

        <Box h={100} />

      </Box>

      <Footer />

    </Box>
  );
}

export default HomePage;