import React, { useState } from 'react'

import { BsThreeDots } from 'react-icons/bs'
import { MdPlaylistAddCheck } from 'react-icons/md'
import { RiPlayListAddFill, RiHeartAddFill, RiShareForwardLine, RiHeartAddLine } from 'react-icons/ri'
import { AiOutlineDislike, AiFillDislike, AiOutlineLike, AiFillLike } from 'react-icons/ai'

import style from '../style.module.css'

import {
    Flex,
    Button,
} from '@chakra-ui/react'

function UtilButtons() {
    let [saveVideo, setSaveVideo] = useState(false)
    let [disLikeBtn, setDislikeBtn] = useState(false)
    let [likeBtn, setLikeBtn] = useState(false)
    let [thanks, setThanks] = useState(false)

    let likeCount = 100

    function toggleSaveVideo() {
        setSaveVideo(!saveVideo)
    }
    function toggleDislikeBtn() {
        setDislikeBtn(!disLikeBtn)
    }
    function toggleLikeBtn() {
        setLikeBtn(!likeBtn)
    }
    function toggleThanks(){
        setThanks(!thanks)
    }
    return (
        <div className={style.VideoBtnsContainer}>
            <Flex>
                <Button
                    leftIcon={likeBtn ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                    onClick={() => toggleLikeBtn()}
                    variant='ghost'>
                    {formatNumber(likeCount)}
                </Button>
                <Button
                    onClick={() => toggleDislikeBtn()}
                    variant='ghost'>
                    {disLikeBtn ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                </Button>
                <Button
                    leftIcon={saveVideo ? <MdPlaylistAddCheck size={20} /> : <RiPlayListAddFill size={20} />}
                    onClick={() => toggleSaveVideo()}
                    variant='ghost'>
                    Save
                </Button>
                <Button
                    leftIcon={thanks ? <RiHeartAddFill size={20} /> : <RiHeartAddLine size={20} />}
                    variant='ghost'
                    onClick={() => toggleThanks()}>
                    Thanks
                </Button>
                <Button
                    leftIcon={<RiShareForwardLine size={20} />}
                    variant='ghost'>
                    Share
                </Button>
                <Button variant='ghost'><BsThreeDots size={20} /></Button>
            </Flex>
        </div>
    )
}

function formatNumber(number) {
    return number.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'short'
    });
}

export default UtilButtons