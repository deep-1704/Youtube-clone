import React, { useState, useEffect } from 'react'

import WHL from '../../Components/WHL/WHL'

import { Spinner } from '@chakra-ui/react'

import { getVideosByTag } from '../../Api/api'

function LikedVideos() {
  let [likedVideos, setLikedVideos] = useState(null)

  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('user_id')

  useEffect(() => {
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
    fetchLikedVideos()
  }, [])
  return (
    <>
      {
        likedVideos ?
          <WHL purpose="Liked Videos" videoList={likedVideos} />
          :
          <Spinner />
      }
    </>
  )
}

export default LikedVideos