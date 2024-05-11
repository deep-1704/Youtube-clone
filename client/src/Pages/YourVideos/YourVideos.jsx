import React, { useState, useEffect } from 'react'

import {
  Heading,
  Stack,
  Spinner,
} from '@chakra-ui/react'
import VideoGrid from '../../Components/VideoGrid/VideoGrid'

import { getChannel, getVideosByChannelName } from '../../Api/api'

function YourVideos() {
  let userId = localStorage.getItem('user_id')
  let token = localStorage.getItem('token')

  let [videos, setVideos] = useState(null)

  useEffect(() => {
    async function fetchChannel() {
      let response = await getChannel(token, 'me', userId)
      // let channel = null;
      if (response.status === 200) {
        // channel = response.data
      } else if (response.status === 401) {
        alert('Unauthorized')
      } else {
        console.log('Error: ' + response)
      }

      let _response = await getVideosByChannelName(response?.data?.name)

      if (_response?.status === 200) {
        setVideos(_response?.data)
      } else {
        console.log('Error: ' + _response)
      }
    }
    fetchChannel()
  }, [])

  return (
    <Stack padding={5}>
      <Heading>Your Videos</Heading>
      {
        videos ?
          <VideoGrid videos={videos} />
          :
          <Spinner />
      }
    </Stack>
  )
}

export default YourVideos