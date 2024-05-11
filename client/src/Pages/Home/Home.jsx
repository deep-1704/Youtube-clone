import React, { useState, useEffect } from 'react'
import style from '../style.module.css'
import VideoGrid from '../../Components/VideoGrid/VideoGrid'

import { getAllVideos } from '../../Api/api'

import {
  Button,
  Flex,
  Stack,
  Spinner,
} from '@chakra-ui/react'

function Home() {
  let [allVideos, setAllVideos] = useState(null)

  useEffect(() => {
    async function fetchVideos() {
      let response = await getAllVideos()
      if (response.status === 200) {
        setAllVideos(response.data)
      } else {
        console.log("Error fetching videos")
      }
    }
    fetchVideos()
  }, [])

  let navItems = [
    "All",
    "Gaming",
    "Music",
    "Movies",
    "News",
    "Sports",
    "Fashion",
    "Tech",
    "Education",
    "Entertainment",
    "Comedy",
    "Beauty",
    "Science",
    "Travel",
    "Health",
    "Food",
    "History",
    "Art",
    "Fitness",
  ]
  return (
    <div className={style.HomeContainer} style={{ width: '100vw' }}>
      <Stack marginTop={5}>
        <Flex wrap='wrap' gap={2} backgroundColor='white' paddingBottom={2} zIndex={-1}>
          {navItems.map((item, index) => {
            return (
              <Button key={index} variant='solid'>{item}</Button>
            )
          })}
        </Flex>
        {
          allVideos ?
            <VideoGrid videos={allVideos} />
            :
            <Spinner size='xl' />
        }
      </Stack>
    </div>
  )
}

export default Home