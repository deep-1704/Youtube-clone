import React from 'react'
import style from '../style.module.css'
import LeftsideBar from '../../Components/LeftSideBar/LeftsideBar'

function Home() {
  return (
    <div className={style.HomeContainer}>
        <LeftsideBar />
    </div>
  )
}

export default Home