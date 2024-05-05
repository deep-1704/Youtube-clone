import React from 'react'
import style from '../style.module.css'
import VideoGrid from '../../Components/VideoGrid/VideoGrid'

function Home() {
  let vids = [
    {
      _id: 1,
      video_src: "vid",
      title: "10 minutes to escape or the room will explode",
      channel: "MrBeast",
      description: "Description for video 1"
    },
    {
      _id: 2,
      video_src: "vid",
      title: "I spent 24 hours in a bubble",
      channel: "Markiplier",
      description: "Description for video 2"
    },
    {
      _id: 3,
      video_src: "vid",
      title: "I bought a car with only pennies",
      channel: "PewDiePie",
      description: "Description for video 3"
    },
    {
      _id: 4,
      video_src: "vid",
      title: "I spent a day in a haunted house",
      channel: "Jacksepticeye",
      description: "Description for video 4"
    },
    {
      _id: 5,
      video_src: "vid",
      title: "I spent 24 hours in a tree",
      channel: "Ninja",
      description: "Description for video 5"
    }
  ]
  return (
    <div className={style.HomeContainer}>
      <VideoGrid />
    </div>
  )
}

export default Home