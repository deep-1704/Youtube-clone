import React from 'react'

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

function EditChannel({ channel }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                            <Editable defaultValue={channel.channelName} border='1px solid black' padding={2} borderRadius={5}>
                                <EditablePreview />
                                <EditableInput />
                            </Editable>
                            <Editable defaultValue={channel.channelDescription} border='1px solid black' padding={2} borderRadius={5}>
                                <EditablePreview />
                                <EditableTextarea />
                            </Editable>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
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