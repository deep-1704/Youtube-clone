import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Library from '../Pages/Library/Library'
import YourVideos from '../Pages/YourVideos/YourVideos'
import WatchHistory from '../Pages/WatchHistory/WatchHistory'
import WatchLater from '../Pages/WatchLater/WatchLater'
import LikedVideos from '../Pages/Likedvideos/LikedVideos'

function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/library' element={<Library />} />
      <Route path='/watchHistory' element={<WatchHistory />} />
      <Route path='/watchLater' element={<WatchLater />} />
      <Route path='/yourVideos' element={<YourVideos />} />
      <Route path='/likedvideos' element={<LikedVideos />} />
    </Routes>
  )
}

export default AllRoutes