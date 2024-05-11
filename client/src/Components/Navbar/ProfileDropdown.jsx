import React, { useState, useEffect } from 'react'

import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    useDisclosure,
    Button,
    Input,
    Textarea,
    Spinner,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { getChannel, createChannel } from '../../Api/api'

function ProfileDropdown({ name, src }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let [channelId, setChannelId] = useState('me')
    let [channelName, setChannelName] = useState('')
    let [description, setDescription] = useState('')
    let userID = localStorage.getItem('user_id')
    let token = localStorage.getItem('token')

    useEffect(() => {
        async function fetchChannel() {
            let response = await getChannel(token, channelId, userID)
            if (response.status === 200) {
                setChannelId(response?.data?._id)
            } else {
                setChannelId(null)
            }
        }

        fetchChannel()
    }, [])

    async function handleCreateChannel() {
        let response = await createChannel(token, channelName, description, userID)
        if (response.status === 201) {
            setChannelId(response?.data?.insertedId)
            onClose()
        } else {
            alert('Channel creation failed')
        }
    }

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        window.location.reload()
    }

    return (
        <Menu>
            <MenuButton as={Avatar} name={name} src={src} cursor='pointer'></MenuButton>
            <MenuList zIndex='1'>
                <MenuItem>
                    {
                        channelId === 'me' ?
                            <Spinner />
                            :
                            (
                                channelId ?
                                    <NavLink to={'/channelPage/' + channelId}>Your Channel</NavLink>
                                    :
                                    <Text onClick={onOpen}>Create Channel</Text>
                            )

                    }
                </MenuItem>
                <MenuItem color='red' onClick={handleLogout}>Logout</MenuItem>
            </MenuList>

            {/* Modal */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Channel</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder='Channel Name' onChange={(e) => setChannelName(e.target.value)}/>
                        <Textarea placeholder='Description' mt={2} onChange={(e) => setDescription(e.target.value)}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreateChannel}>
                            Create
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Menu>
    )
}

export default ProfileDropdown