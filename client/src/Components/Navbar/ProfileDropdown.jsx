import React from 'react'

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
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

function ProfileDropdown({ name, src, cid }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Menu>
            <MenuButton as={Avatar} name={name} src={src} cursor='pointer'></MenuButton>
            <MenuList zIndex='1'>
                <MenuItem>
                    {
                        cid ?
                            <NavLink to={'/channelPage/' + cid}>Your Channel</NavLink>
                            :
                            <Text onClick={onOpen}>Create Channel</Text>
                    }
                </MenuItem>
                <MenuItem color='red'>Logout</MenuItem>
            </MenuList>

            {/* Modal */}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Channel</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder='Channel Name' />
                        <Textarea placeholder='Description' mt={2} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
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