import React from 'react'
import style from '../style.module.css'
import ShowVideo from '../ShowVideo/ShowVideo'

import {
  Flex,
} from '@chakra-ui/react'

function VideoGrid({ videos }) {
  return (
    <div className={style.VideoGridContainer}>
      <Flex wrap='wrap' gap={5} padding={7}>
        {videos.map((video) => {
          return (
            <ShowVideo key={video._id} video={video} />
          )
        })}
      </Flex>
    </div>
  )
}

export default VideoGrid