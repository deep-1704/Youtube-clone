import React, { useState } from 'react'

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
} from '@chakra-ui/react'

import { updateComment } from '../../Api/api'

function EditBtn({ commentId }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let [isLoading, setIsLoading] = useState(false)
    let [newComment, setNewComment] = useState('')

    let token = localStorage.getItem('token')

    let handleEdit = async () => {
        setIsLoading(true)
        
        let response = await updateComment(token, commentId, newComment)
        if(response.status === 204){
            window.location.reload()
        }else{
            console.log('Error updating comment: ', response.status)
        }

        setIsLoading(false)
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen}>Edit</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea placeholder='Edit your comment' onChange={(e) => setNewComment(e.target.value)}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={isLoading} colorScheme='blue' mr={3} onClick={handleEdit}>
                            Post
                        </Button>
                        <Button variant='ghost'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditBtn