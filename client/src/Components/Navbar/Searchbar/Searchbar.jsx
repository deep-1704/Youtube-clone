import style from '../../style.module.css'
import React, { useEffect } from 'react'

import {
    Input,
    InputGroup,
    InputRightElement,
    Flex
} from '@chakra-ui/react'
import {
    SearchIcon
} from '@chakra-ui/icons'

import { BsMicFill } from 'react-icons/bs'

import SearchList from './SearchList'
import { getAllVideos } from '../../../Api/api'


function Searchbar() {
    let [searchQuery, setSearchQuery] = React.useState('');
    let [searchList, setSearchList] = React.useState(false);
    let [list, setList] = React.useState([])

    useEffect(()=>{
        async function fetchVideos() {
            let response = await getAllVideos()
            if (response?.status === 200) {
                let videos = response?.data
                let titles = videos.map((video) => video.title)
                setList(titles)
            } else {
                console.log("Error fetching videos")
            }
        }
        fetchVideos()
    }, [])

    async function handleSearch(){
        setSearchList(false)
        window.location.href = '/search/' + searchQuery
    }

    return (
        <div className={style.searchbarContainer}>
            <Flex alignItems='center' gap='3'>
                <InputGroup width="600px">
                    <Input type='text' placeholder='Search' value={searchQuery} borderRadius='40px' onChange={(e) => setSearchQuery(e.target.value)} onClick={() => setSearchList(true)} />
                    <InputRightElement children={<SearchIcon />} cursor='pointer' onClick={handleSearch} />
                </InputGroup>
                <div style={{ width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px", backgroundColor: "rgb(0,0,0,0.1)" }}>
                    <BsMicFill size='20px' color='black' cursor='pointer' />
                </div>
            </Flex>
            {searchQuery && searchList && <SearchList searchList={list} setSearchQuery={setSearchQuery} setSearchList={setSearchList} />}
        </div>
    )
}

export default Searchbar