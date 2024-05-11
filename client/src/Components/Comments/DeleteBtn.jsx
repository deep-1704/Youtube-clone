import React, {useState} from 'react'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
} from '@chakra-ui/react'

import { deleteComment } from '../../Api/api'

function DeleteBtn({ commentId, videoId }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    let[isLoading, setIsLoading] = useState(false)
    let token = localStorage.getItem('token')

    let handleDelete = async () => {
        setIsLoading(true)
        let response = await deleteComment(token, commentId, videoId)
        if(response.status === 204){
            window.location.reload()
        }else{
            alert('Error deleting comment')
        }
        setIsLoading(false)
        onClose()
    }

    return (
        <>
            <Button colorScheme='red' onClick={onOpen}>
                Delete
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this comment?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button isLoading={isLoading} colorScheme='red' onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteBtn