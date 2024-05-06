import style from '../style.module.css'
import logo from '../../Assets/images/YouTube-Logo.png'
import Searchbar from './Searchbar/Searchbar'
import {
    Flex,
    Button,
    Stack,
    Avatar,
    useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { RiVideoAddLine } from 'react-icons/ri'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import LeftDrawer from '../LeftSideBar/LeftDrawer'

function Navbar() {
    let CurrentUser = {
        result: {
            name: "John Doe",
            email: "john@gmail.com"
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className={style.NavbarContainer} style={{position:'sticky', top:'0', backgroundColor:'white'}}>
            <Flex alignItems='center' justifyContent='space-between' paddingRight="20px">
                <Flex alignItems='center'>
                    <Button colorScheme="black" variant="ghost" leftIcon={<HamburgerIcon />} size="lg" onClick={onOpen}/>
                    <LeftDrawer onClose={onClose} isOpen={isOpen} />
                    <Link to='/'><img src={logo} alt="YouTube Logo" style={{ width: "110px" }} /></Link>
                </Flex>
                <Searchbar />
                <Flex gap={6} alignItems='center'>
                    <RiVideoAddLine size="30px" color='black' cursor='pointer' />
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
                {CurrentUser ?
                    (CurrentUser.result.name ?
                        <Avatar name={CurrentUser.result.name} />
                        :
                        <Avatar name={CurrentUser.result.email} />
                    )
                    :
                    <Button leftIcon={<BiUserCircle size='30px' />} colorScheme="blue" variant="outline" size="md">
                        Sign In
                    </Button>
                }
            </Flex>
        </div>
    )
}

export default Navbar