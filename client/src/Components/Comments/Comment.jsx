import React from 'react'

import {
  Stack,
  Flex,
  Avatar,
  Text,
  Button,
} from '@chakra-ui/react'

import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';

function Comment({ user, comment, userId, commentId, videoId }) {
  let currentUserId = localStorage.getItem('user_id');
  return (
    <Flex gap={3}>
      <Avatar name={user} src='https://bit.ly/broken-link' size='sm' />
      <Stack>
        <Text as='b'>{user}</Text>
        <Text>{comment}</Text>
          {
            (currentUserId === userId) ?
              (
                <Flex gap={5} justifyContent='end' width='100%'>
                  <EditBtn commentId={commentId}/>
                  <DeleteBtn commentId={commentId} videoId={videoId}/>
                </Flex>
              )
              :
              <></>
          }
      </Stack>
    </Flex>
  )
}

export default Comment