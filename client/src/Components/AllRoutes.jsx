import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Library from '../Pages/Library/Library'
import YourVideos from '../Pages/YourVideos/YourVideos'
import WatchHistory from '../Pages/WatchHistory/WatchHistory'
import WatchLater from '../Pages/WatchLater/WatchLater'
import LikedVideos from '../Pages/Likedvideos/LikedVideos'
import VideoPage from '../Pages/VideoPage/VideoPage'
import ChannelPage from '../Pages/ChannelPage/ChannelPage'
import SearchPage from '../Pages/SearchPage/SearchPage'

function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/library' element={<Library />} />
      <Route path='/watchHistory' element={<WatchHistory />} />
      <Route path='/watchLater' element={<WatchLater />} />
      <Route path='/yourVideos' element={<YourVideos />} />
      <Route path='/likedvideos' element={<LikedVideos />} />
      <Route path='/videoPage/:videoId' element={<VideoPage />} />
      <Route path='/channelPage/:cid' element={<ChannelPage />} />
      <Route path='/search/:query' element={<SearchPage />} />
    </Routes>
  )
}

export default AllRoutes