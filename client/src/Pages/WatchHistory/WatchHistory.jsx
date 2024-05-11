import React, { useState, useEffect } from 'react'

import WHL from '../../Components/WHL/WHL'

import { getVideosByTag, deleteUserHistory } from '../../Api/api'

import {
  Flex,
  Button,
  Spinner,
} from '@chakra-ui/react'

function WatchHistory() {
  let [watchHistory, setWatchHistory] = useState(null)
  let [isLoading, setIsLoading] = useState(false)

  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('user_id')

  useEffect(() => {
    async function fetchHistoryVideos() {
      let response = await getVideosByTag(token, 'hs', userId)

      if (response?.status === 200) {
        setWatchHistory(response?.data)
      } else if (response?.status === 400) {
        alert('Invalid Tag')
      } else if (response?.status === 401) {
        alert('Unauthorized')
      } else {
        console.log('Error: ' + response)
      }
    }
    fetchHistoryVideos()
  }, [])

  async function handleClearHistory() {
    setIsLoading(true)
    let response = await deleteUserHistory(token, userId)
    if(response?.status === 204){
      setWatchHistory(null)
      window.location.reload()
    }else if(response?.status === 401){
      alert('Unauthorized')
    }else{
      console.log('Error: ' + response)
    }
    setIsLoading(false)
  }

  return (
    <>
      {
        watchHistory ?
          (<Flex gap={7}>
            <WHL purpose="Watch History" videoList={watchHistory} />
            <Button isLoading={isLoading} marginTop={7} onClick={handleClearHistory}>Clear History</Button>
          </Flex>)
          :
          <Spinner />
      }
    </>
  )
}

export default WatchHistory