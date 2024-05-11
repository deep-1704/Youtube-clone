import React from 'react'

import { AiOutlineHome, AiFillPlaySquare, AiFillLike } from 'react-icons/ai'
import { MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater } from 'react-icons/md'
import { FaHistory } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Stack,
    Text,
    Button,
    Flex,
    Divider,
    Avatar,
} from '@chakra-ui/react'

function LeftDrawer({ onClose, isOpen }) {
    let subscriptions = ['MrBeast', 'PewDiePie', 'Markiplier', 'Jacksepticeye', 'Ninja'];
    return (
        <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='xs'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerBody>
                    <Stack gap={3} marginTop={5} >
                        <NavLink to='/'>
                            <Button variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                                <Flex alignItems='center' gap={4} cursor='pointer' >
                                    <AiOutlineHome size="27" />
                                    <Text fontSize="15px">Home</Text>
                                </Flex>
                            </Button>
                        </NavLink>
                        <Button variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                            <Flex alignItems='center' gap={4} cursor='pointer' >
                                <MdOutlineExplore size="27" />
                                <Text fontSize="15px">Explore</Text>
                            </Flex>
                        </Button>
                        <Button variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                            <Flex alignItems='center' gap={4} cursor='pointer' >
                                <MdOutlineSubscriptions size="27" />
                                <Text fontSize="15px">Subscriptions</Text>
                            </Flex>
                        </Button>
                        <Divider />
                        <NavLink to='/library'>
                            <Button variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                                <Flex alignItems='center' gap={4} cursor='pointer' >
                                    <MdOutlineVideoLibrary size="27" />
                                    <Text fontSize="15px">Library</Text>
                                </Flex>
                            </Button>
                        </NavLink>
                        <NavLink to='/watchHistory'>
                            <Button variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                                <Flex alignItems='center' gap={4} cursor='pointer' >
                                    <FaHistory size="27" />
                                    <Text fontSize="15px">History</Text>
                                </Flex>
                            </Button>
                        </NavLink>
                        <NavLink to='/yourVideos'>
                            <Button variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                                <Flex alignItems='center' gap={4} cursor='pointer' >
                                    <AiFillPlaySquare size="27" />
                                    <Text fontSize="15px">Your videos</Text>
                                </Flex>
                            </Button>
                        </NavLink>
                        <NavLink to='/watchLater'>
                            <Button variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                                <Flex alignItems='center' gap={4} cursor='pointer' >
                                    <MdOutlineWatchLater size="27" />
                                    <Text fontSize="15px">Watch later</Text>
                                </Flex>
                            </Button>
                        </NavLink>
                        <NavLink to='/likedVideos'>
                            <Button variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                                <Flex alignItems='center' gap={4} cursor='pointer' >
                                    <AiFillLike size="27" />
                                    <Text fontSize="15px">Liked videos</Text>
                                </Flex>
                            </Button>
                        </NavLink>
                        <Divider />
                        <DrawerHeader>Your Subscriptions</DrawerHeader>
                        <Stack gap={0}>
                            {
                                subscriptions.map((subscription, index) => {
                                    return (
                                        <Button key={index} variant='ghost' justifyContent='left' height='fit-content' width='100%' paddingTop='10px' paddingBottom='10px' onClick={() => onClose()}>
                                            <Flex alignItems='center' gap={4} cursor='pointer' >
                                                <Avatar name={subscription} size='sm' />
                                                <Text fontSize="15px">{subscription}</Text>
                                            </Flex>
                                        </Button>
                                    )
                                })
                            }
                        </Stack>
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default LeftDrawer