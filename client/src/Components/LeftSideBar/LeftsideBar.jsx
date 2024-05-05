import React from 'react'
import style from '../style.module.css'

import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

import {
    Stack,
    Text,
    Button
} from '@chakra-ui/react'

function LeftsideBar() {
    return (
        <div className={style.LeftsidebarContainer} style={{ width: '90px' }}>
            <Stack gap={3} marginTop={5} alignItems='center'>
                <NavLink to='/'>
                    <Button variant='ghost' height='fit-content' width='fit-content' paddingTop='10px' paddingBottom='10px'>
                        <Stack alignItems='center' cursor='pointer' >
                            <AiOutlineHome size="27" />
                            <Text fontSize="12px">Home</Text>
                        </Stack>
                    </Button>
                </NavLink>
                <NavLink to='/explore'>
                    <Button variant='ghost' height='fit-content' width='fit-content' paddingTop='10px' paddingBottom='10px'>
                        <Stack alignItems='center' cursor='pointer' >
                            <MdOutlineExplore size="27" />
                            <Text fontSize="12px">Explore</Text>
                        </Stack>
                    </Button>
                </NavLink>
                <NavLink to='/subscriptions'>
                    <Button variant='ghost' height='fit-content' width='fit-content' paddingTop='10px' paddingBottom='10px'>
                        <Stack alignItems='center' cursor='pointer' >
                            <MdOutlineSubscriptions size="27" />
                            <Text fontSize="10px">Subscriptions</Text>
                        </Stack>
                    </Button>
                </NavLink>
                <NavLink to='/library'>
                    <Button variant='ghost' height='fit-content' width='fit-content' paddingTop='10px' paddingBottom='10px'>
                        <Stack alignItems='center' cursor='pointer' >
                            <MdOutlineVideoLibrary size="27" />
                            <Text fontSize="12px">Library</Text>
                        </Stack>
                    </Button>
                </NavLink>
            </Stack>
        </div>
    )
}

export default LeftsideBar