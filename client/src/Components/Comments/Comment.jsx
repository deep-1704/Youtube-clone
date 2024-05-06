import React from 'react'

import {
    Stack,
    Flex,
    Avatar,
    Text,
} from '@chakra-ui/react'

function Comment({ user, comment }) {
  return (
    <Flex gap={3}>
        <Avatar name={user} src='https://bit.ly/broken-link' size='sm'/>
        <Stack>
            <Text as='b'>{user}</Text>
            <Text>{comment}</Text>
        </Stack>
    </Flex>
  )
}

export default Comment