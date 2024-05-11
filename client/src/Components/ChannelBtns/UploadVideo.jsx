import React, { useState } from 'react'

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

import { uploadVideo } from '../../Api/api';

function UploadVideo({ channel }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    let [isLoading, setIsLoading] = useState(false)
    let token = localStorage.getItem('token')

    async function handleSubmit(e) {
        setIsLoading(true)
        console.log("reach")
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.target).entries());
        
        // return if any field is empty
        if (Object.values(data).some((value) => value === null || value === '')) {
            alert('Please fill all the fields')
            setIsLoading(false)
            return
        }

        // console.log(data.userVideo)
        // return if video is not selected
        if (data.userVideo.size === 0) {
            alert('Please select a video to upload')
            setIsLoading(false)
            return
        }

        const formData = new FormData();

        formData.append('videoTitle', data.videoTitle)
        formData.append('videoDescription', data.videoDescription)
        formData.append('userVideo', data.userVideo)
        formData.append('channelName', channel.name)

        let response = await uploadVideo(token, formData)
        if (response.status === 201) {
            console.log('Video Uploaded')
            window.location.reload()
        } else {
            alert('Error: ' + response.status)
        }
        setIsLoading(false)
    }

    return (
        <>
            <Button colorScheme='green' leftIcon={<FaCloudUploadAlt />} onClick={onOpen}>Upload Video</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <ModalHeader>Upload</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack gap={4}>
                                <Input placeholder='Title' name='videoTitle' />
                                <Textarea placeholder='Description' name='videoDescription' />
                                <Stack>
                                    <Text>Upload Video</Text>
                                    <Input type='file' accept='video/*' name='userVideo' />
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button isLoading={isLoading} colorScheme='green' variant='outline' mr={3} type='submit'>
                                Upload
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UploadVideo