import React, { useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Stack,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
} from '@chakra-ui/react'

import { updateChannel } from '../../Api/api'

function EditChannel({ channel }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    let [currentChannelName, setCurrentChannelName] = useState(channel.name)
    let [currentDescription, setCurrentDescription] = useState(channel.description)
    let [isLoading, setIsLoading] = useState(false)

    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('user_id')

    let handleSubmit = async () => {
        setIsLoading(true)
        let response = await updateChannel(token, channel._id, currentChannelName, currentDescription, userId)
        if(response.status === 204){
            console.log('Channel Updated')
            setIsLoading(false)
            window.location.reload()
            onClose()
        }else if(response.status === 401){
            setIsLoading(false)
            alert('Unauthorized')
        }
        else{
            setIsLoading(false)
            alert('Channel Update Failed')
        }
    }

    return (
        <>
            <Button onClick={onOpen}>Edit Channel</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Channel</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack gap={4}>
                            <Editable defaultValue={channel.name} border='1px solid black' padding={2} borderRadius={5}>
                                <EditablePreview />
                                <EditableInput onChange={(e) => setCurrentChannelName(e.target.value)}/>
                            </Editable>
                            <Editable defaultValue={channel.description} border='1px solid black' padding={2} borderRadius={5}>
                                <EditablePreview />
                                <EditableTextarea onChange={(e) => setCurrentDescription(e.target.value)}/>
                            </Editable>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={isLoading} colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditChannel