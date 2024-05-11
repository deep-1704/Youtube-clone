import React from 'react'
import {
    Stack,
    Button,
} from '@chakra-ui/react'

import {
    SearchIcon
} from '@chakra-ui/icons'

function SearchList({ searchList, setSearchQuery, setSearchList }) {
    return (
        <Stack position='absolute' border="1px solid black" borderRadius="20px" zIndex={1} backgroundColor='white'>
            {searchList.map((item, index) => {
                return (
                    <Button
                        leftIcon={<SearchIcon />}
                        key={index} variant="ghost"
                        width="600px"
                        justifyContent="flex-start"
                        borderRadius="20px"
                        onClick={(e) => {
                            setSearchQuery(item)
                            setSearchList(false)
                            window.location.href = '/search/' + item
                        }}>
                        {item}
                    </Button>
                )
            })}
        </Stack>
    )
}

export default SearchList