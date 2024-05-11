import React, { useState, useEffect } from 'react'
import WHL from '../../Components/WHL/WHL'

import { getVideosByTag } from '../../Api/api'
import { Spinner } from '@chakra-ui/react'

function WatchLater() {
  let [watchLater, setWatchLater] = useState(null)
  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('user_id')

  useEffect(() => {
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
    fetchWatchLaterVideos()
  }, [])
  
  return (
    <>
      {
        watchLater ?
          <WHL purpose="Watch Later" videoList={watchLater} />
          :
          <Spinner />
      }
    </>
  )
}

export default WatchLater