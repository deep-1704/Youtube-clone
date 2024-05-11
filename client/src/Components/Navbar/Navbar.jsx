import style from '../style.module.css'
import logo from '../../Assets/images/YouTube-Logo.png'
import Searchbar from './Searchbar/Searchbar'
import {
    Flex,
    Button,
    Stack,
    useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { GoogleLogin } from '@react-oauth/google'

import { jwtDecode } from 'jwt-decode'

import { RiVideoAddLine } from 'react-icons/ri'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Link, NavLink } from 'react-router-dom'
import LeftDrawer from '../LeftSideBar/LeftDrawer'
import ProfileDropdown from './ProfileDropdown'
import { useState } from 'react'

import { userLogin } from '../../Api/api'

function Navbar() {

    let token = localStorage.getItem('token')
    let decoded;
    if(token) decoded = jwtDecode(token)

    let [currentUser, setCurrentUser] = useState({
        email: decoded?.email,
        first_name: decoded?.given_name,
        last_name: decoded?.family_name,
        name: decoded?.name,
        picture: decoded?.picture,
    })
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function onSuccess(response) {
        localStorage.setItem('token', response.credential)

        const decoded = jwtDecode(response.credential);

        let loginResponse = await userLogin(response.credential)

        if(loginResponse.status === 201){
            localStorage.setItem('user_id', loginResponse?.data)
            setCurrentUser({
                email: decoded?.email,
                first_name: decoded?.given_name,
                last_name: decoded?.family_name,
                name: decoded?.name,
                picture: decoded?.picture,
            })
            alert('Login Successful')
        }else{
            alert('Login Failed')
        }

    }

    function onFailure(response) {
        console.log(response)
    }

    return (
        <div className={style.NavbarContainer} style={{ position: 'sticky', top: '0', backgroundColor: 'white' }}>
            <Flex alignItems='center' justifyContent='space-between' paddingRight="20px">
                <Flex alignItems='center'>
                    <Button colorScheme="black" variant="ghost" leftIcon={<HamburgerIcon />} size="lg" onClick={onOpen} />
                    <LeftDrawer onClose={onClose} isOpen={isOpen} />
                    <Link to='/'><img src={logo} alt="YouTube Logo" style={{ width: "110px" }} /></Link>
                </Flex>
                <Searchbar />
                <Flex gap={6} alignItems='center'>
                    <NavLink to='/channelPage/me'>
                        <RiVideoAddLine size="30px" color='black' cursor='pointer' />
                    </NavLink>
                    <Stack gap={1} cursor='pointer'>
                        <Flex gap={1}>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                        </Flex>
                        <Flex gap={1}>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                        </Flex>
                        <Flex gap={1}>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                            <div style={{ border: "1px solid black", width: "5px", height: "5px" }}></div>
                        </Flex>
                    </Stack>
                    <IoMdNotificationsOutline size="30px" color='black' cursor='pointer' />
                </Flex>
                {(currentUser.name || currentUser.email) ?
                    (currentUser.name ?
                        <ProfileDropdown name={currentUser.name} src={currentUser.picture} />
                        :
                        <ProfileDropdown name={currentUser.email} src={currentUser.picture} />
                    )
                    :
                    <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
                }
            </Flex>
        </div>
    )
}

export default Navbar