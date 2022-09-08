import * as React from 'react'
import { theme, Box, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, Heading, } from '@chakra-ui/react'
import { FaDiscord } from 'react-icons/fa';
import { useSearchParams, useLocation } from "react-router-dom"

// Components
import Header from '../comps/Header';

function PageNotFound() {

    const [isLoading, setLoading] = React.useState(false)
    const [isDisabled, setDisabled] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

  return (
    <Box w='20vw' theme={theme} flexDirection="column">

      <Heading fontSize={50} textAlign='center' fontWeight={700}>404 Page Not Found</Heading>

    </Box>
  );
}

export default PageNotFound;