import style from '../../style.module.css'
import React from 'react'

import {
    Input,
    InputGroup,
    InputRightElement,
    Flex
} from '@chakra-ui/react'

import { BsMicFill } from 'react-icons/bs'

import {
    SearchIcon
} from '@chakra-ui/icons'
import SearchList from './SearchList'


function Searchbar() {
    let [searchQuery, setSearchQuery] = React.useState('');
    let [searchList, setSearchList] = React.useState(false);

    let list = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"].filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
        <div className={style.searchbarContainer}>
            <Flex alignItems='center' gap='3'>
                <InputGroup width="600px">
                    <Input type='text' placeholder='Search' value={searchQuery} borderRadius='40px' onChange={(e) => setSearchQuery(e.target.value)} onClick={() => setSearchList(true)}/>
                    <InputRightElement children={<SearchIcon />} cursor='pointer' onClick={() => setSearchList(false)}/>
                </InputGroup>
                <div style={{width:"40px", height:"40px", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"20px", backgroundColor:"rgb(0,0,0,0.1)"}}>
                    <BsMicFill size='20px' color='black' cursor='pointer' />
                </div>
            </Flex>
            {searchQuery && searchList && <SearchList searchList={list} setSearchQuery={setSearchQuery} setSearchList={setSearchList}/>}
        </div>
    )
}

export default Searchbar