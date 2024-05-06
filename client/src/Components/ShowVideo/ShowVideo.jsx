import React from 'react'
import style from '../style.module.css'

import {
  Stack,
  Text,
  Avatar,
  Flex,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'

function ShowVideo({ video }) {
  let date1 = new Date(video.upload_date)
  let date2 = new Date();
  let days = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
  return (
    <Link to={`/videoPage/${video._id}`} className={style.VideoContainer} style={{width:"370px"}}>
      <Stack>
        <video src={video.video_src} width='100%' />
        <Flex gap={4}>
          <Avatar name={video.channel} src='https://bit.ly/broken-link' zIndex={-1}/>
          <Stack gap={1}>
            <Text as='b'>{video.title}</Text>
            <Text>{video.channel}</Text>
            <Text>{formatNumber(video.views)} views - {formatDays(days)} ago</Text>
          </Stack>
        </Flex>
      </Stack>
    </Link >
  )
}

function formatNumber(number) {
  return number.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short'
  });
}

function formatDays(days) {
  if (days < 1) {
    return 'Today';
  } else if (days < 7) {
    return `${days} days`;
  } else if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} weeks`;
  } else if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} months`;
  } else {
    const years = Math.floor(days / 365);
    return `${years} years`;
  }
}


export default ShowVideo