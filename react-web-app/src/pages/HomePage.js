import * as React from 'react'
import { theme, Box, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, Heading, Text, Hide, Show, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
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
    const toast = useToast()

    const handleChange = (event) => setEmail(event.target.value)

    React.useEffect(() => {
      document.title = 'coming soon...';
    });

    const subscribe = async () => {
        setLoading(true)
        console.log(email)
        setDisabled(true)
        const res = await fetch('https://6lcdbjork2.execute-api.us-east-1.amazonaws.com/mail/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: String(email)
            })
        })
        const data = await res.json()
        if (data.message === 'Email already exists') {
            toast({
                title: "Email already exists.",
                description: "Try another email.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        } else if (data.message === 'Email Subscribed') {
            toast({
                title: "Subscribed",
                description: "You have been subscribed to our mailing list",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        } else {
          console.log(data)
            toast({
                title: "Error",
                description: "There was an error subscribing you to our mailing list",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
        setLoading(false)
        setDisabled(false)
    }

  return (
    <Box p={5} h={'fit-content'} flexDirection="column" bgGradient='linear(to-b, #6320EE, #8075FF, #7e59ca)'>

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
            placeholder="Email"
            size="lg"
            // width={'30vw'}
            color={'white'}
            _placeholder={{ color: 'gray.400' }}
            type="email"
            onChange={handleChange}
            disabled={isDisabled}
          />
          <InputRightElement width='5.5rem'>
            <Button mr={1} disabled={isDisabled} isLoading={isLoading} color={'gray.300'} onClick={() => { subscribe() }}>
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