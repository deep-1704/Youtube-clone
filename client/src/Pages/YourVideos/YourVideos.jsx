import React from 'react'
import sampleVideo from '../../Assets/videos/sample.mov'

import {
  Heading,
  Stack,
} from '@chakra-ui/react'
import VideoGrid from '../../Components/VideoGrid/VideoGrid'

function YourVideos() {
  let vids = [
    {
      _id: 1,
      video_src: sampleVideo,
      title: "10 minutes to escape or the room will explode",
      channel: "MrBeast",
      description: "Description for video 1",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 2,
      video_src: sampleVideo,
      title: "I spent 24 hours in a bubble",
      channel: "Markiplier",
      description: "Description for video 2",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 3,
      video_src: sampleVideo,
      title: "I bought a car with only pennies",
      channel: "PewDiePie",
      description: "Description for video 3",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 4,
      video_src: sampleVideo,
      title: "I spent a day in a haunted house",
      channel: "Jacksepticeye",
      description: "Description for video 4",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 5,
      video_src: sampleVideo,
      title: "I spent 24 hours in a tree",
      channel: "Ninja",
      description: "Description for video 5",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 6,
      video_src: sampleVideo,
      title: "I spent 24 hours in a pool",
      channel: "LazarBeam",
      description: "Description for video 6",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 7,
      video_src: sampleVideo,
      title: "I spent 24 hours in a box",
      channel: "MrBeast",
      description: "Description for video 7",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 8,
      video_src: sampleVideo,
      title: "I spent 24 hours in a tree",
      channel: "Markiplier",
      description: "Description for video 8",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 9,
      video_src: sampleVideo,
      title: "I spent 24 hours in a pool",
      channel: "PewDiePie",
      description: "Description for video 9",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 10,
      video_src: sampleVideo,
      title: "I spent 24 hours in a box",
      channel: "Jacksepticeye",
      description: "Description for video 10",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 11,
      video_src: sampleVideo,
      title: "I spent 24 hours in a tree",
      channel: "Ninja",
      description: "Description for video 11",
      views: 1000000,
      upload_date: "04/17/2004"
    },
    {
      _id: 12,
      video_src: sampleVideo,
      title: "I spent 24 hours in a pool",
      channel: "LazarBeam",
      description: "Description for video 12",
      views: 1000000,
      upload_date: "04/17/2004"
    },
  ]
  return (
      <Stack padding={5}>
        <Heading>Your Videos</Heading>
        <VideoGrid videos={vids} />
      </Stack>
  )
}

export default YourVideos