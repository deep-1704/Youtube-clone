import React from 'react'

import { FaCloudUploadAlt } from "react-icons/fa";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Stack,
    Text,
} from '@chakra-ui/react'

function UploadVideo({ channel }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme='green' leftIcon={<FaCloudUploadAlt />} onClick={onOpen}>Upload Video</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack gap={4}>
                            <Input placeholder='Title' />
                            <Textarea placeholder='Description' />
                            <Stack>
                                <Text>Upload Video</Text>
                                <Input type='file' accept='video/*' />
                            </Stack>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' variant='outline' mr={3} onClick={onClose}>
                            Upload
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UploadVideo