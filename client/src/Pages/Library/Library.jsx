import React, { useState, useEffect } from 'react'

import {
  Stack,
  Flex,
  Heading,
  Divider,
  Spinner,
} from '@chakra-ui/react'

import { getVideosByTag } from '../../Api/api'

import { AiFillLike } from 'react-icons/ai'
import { MdOutlineWatchLater } from 'react-icons/md'
import { FaHistory } from 'react-icons/fa'
import VideoGrid from '../../Components/VideoGrid/VideoGrid'

function Library() {
  let [history, setHistory] = useState(null)
  let [watchLater, setWatchLater] = useState(null)
  let [likedVideos, setLikedVideos] = useState(null)

  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('user_id')

  useEffect(() => {
    async function fetchHistoryVideos() {
      let response = await getVideosByTag(token, 'hs', userId)

      if (response?.status === 200) {
        setHistory(response?.data)
      } else if (response?.status === 400) {
        alert('Invalid Tag')
      } else if (response?.status === 401) {
        alert('Unauthorized')
      } else {
        console.log('Error: ' + response)
      }
    }

    async function fetchLikedVideos() {
      let response = await getVideosByTag(token, 'lk', userId)

      if (response?.status === 200) {
        setLikedVideos(response?.data)
      } else if (response?.status === 400) {
        alert('Invalid Tag')
      } else if (response?.status === 401) {
        alert('Unauthorized')
      } else {
        console.log('Error: ' + response)
      }
    }

    async function fetchWatchLaterVideos() {
      let response = await getVideosByTag(token, 'wl', userId)

      if (response?.status === 200) {
        setWatchLater(response?.data)
      } else if (response?.status === 400) {
        alert('Invalid Tag')
      } else if (response?.status === 401) {
        alert('Unauthorized')
      } else {
        console.log('Error: ' + response)
      }
    }

    fetchHistoryVideos()
    fetchLikedVideos()
    fetchWatchLaterVideos()
  }, [])

  return (
    <Stack padding={7} gap={5}>
      <Stack>
        <Flex alignItems='center' gap={5}>
          <FaHistory size='30' />
          <Heading>History</Heading>
        </Flex>
        {
          history ?
            <VideoGrid videos={history} />
            :
            <Spinner />
        }
      </Stack>
      <Divider />
      <Stack>
        <Flex alignItems='center' gap={5}>
          <MdOutlineWatchLater size='30' />
          <Heading>Watch Later</Heading>
        </Flex>
        {
          watchLater ?
            <VideoGrid videos={watchLater} />
            :
            <Spinner />
        }
      </Stack>
      <Divider />
      <Stack>
        <Flex alignItems='center' gap={5}>
          <AiFillLike size='30' />
          <Heading>Liked Videos</Heading>
        </Flex>
        {
          likedVideos ?
            <VideoGrid videos={likedVideos} />
            :
            <Spinner />
        }
      </Stack>
    </Stack>
  )
}

export default Library