import React from 'react'

import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

function ProfileDropdown({ name, src, cid }) {
    return (
        <Menu>
            <MenuButton as={Avatar} name={name} src={src} cursor='pointer'></MenuButton>
            <MenuList zIndex='1'>
                <MenuItem>
                    <NavLink to={'/channelPage/'+cid}>Your Channel</NavLink>
                </MenuItem>
                <MenuItem color='red'>Logout</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ProfileDropdown