import React, { useState, useEffect } from 'react'

import { BsThreeDots } from 'react-icons/bs'
import { MdPlaylistAddCheck } from 'react-icons/md'
import { RiPlayListAddFill, RiHeartAddFill, RiShareForwardLine, RiHeartAddLine } from 'react-icons/ri'
import { AiOutlineDislike, AiFillDislike, AiOutlineLike, AiFillLike } from 'react-icons/ai'

import { getUserTags, postUserTag, deleteUserTag } from '../../Api/api'

import style from '../style.module.css'

import {
    Flex,
    Button,
} from '@chakra-ui/react'

function UtilButtons({ video }) {
    let userId = localStorage.getItem('user_id')
    let token = localStorage.getItem('token')

    let [saveVideo, setSaveVideo] = useState(false)
    let [disLikeBtn, setDislikeBtn] = useState(false)
    let [likeBtn, setLikeBtn] = useState(false)
    let [thanks, setThanks] = useState(false)
    let [likeCount, setLikeCount] = useState(video.likeCount)

    let [likeLoading, setLikeLoading] = useState(false)
    let [saveVidLoading, setSaveVidLoading] = useState(false)


    useEffect(() => {
        async function fetchTags() {
            let response = await getUserTags(token, userId, video._id)
            if (response.status === 200) {
                let tags = response.data
                if (tags.includes('lk')) {
                    setLikeBtn(true)
                }
                if (tags.includes('wl')) {
                    setSaveVideo(true)
                }
                if (!(tags.includes('hs'))) {
                    let _response = await postUserTag(token, userId, video._id, 'hs')
                    if (_response.status === 401) {
                        console.log('Unauthorized to save history')
                    } else if (_response.status === 201) {
                        console.log('History saved')
                    } else {
                        console.log('Error saving history')
                    }
                }
            } else {
                console.log('Error fetching tags')
            }
        }
        fetchTags()
    }, [])

    async function handleSaveVideo() {
        setSaveVidLoading(true)
        if (saveVideo === false) {
            let response = await postUserTag(token, userId, video._id, 'wl')
            if (response.status === 201) {
                setSaveVideo(true)
            } else if (response.status === 401) {
                alert('Unauthorized')
            } else {
                alert('Error saving video')
            }
        } else {
            let response = await deleteUserTag(token, userId, video._id, 'wl')
            if (response.status === 204) {
                setSaveVideo(false)
            } else if (response.status === 401) {
                alert('Unauthorized')
            } else {
                alert('Error saving video')
            }
        }
        setSaveVidLoading(false)
    }
    function toggleDislikeBtn() {
        setDislikeBtn(!disLikeBtn)
    }
    async function handleLikeBtn() {
        setLikeLoading(true)
        if (likeBtn === false) {
            let response = await postUserTag(token, userId, video._id, 'lk')
            if (response.status === 201) {
                setLikeCount(likeCount + 1)
                setLikeBtn(true)
            } else if (response.status === 401) {
                alert('Unauthorized')
            } else {
                alert('Error liking video')
            }
        }else{
            let response = await deleteUserTag(token, userId, video._id, 'lk')
            if (response.status === 204) {
                setLikeCount(likeCount - 1)
                setLikeBtn(false)
            } else if (response.status === 401) {
                alert('Unauthorized')
            } else {
                alert('Error liking video')
            }
        }
        setLikeLoading(false)
    }
    function toggleThanks() {
        setThanks(!thanks)
    }
    return (
        <div className={style.VideoBtnsContainer}>
            <Flex>
                <Button
                    leftIcon={likeBtn ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                    onClick={() => handleLikeBtn()}
                    variant='ghost'
                    isLoading={likeLoading}>
                    {formatNumber(likeCount)}
                </Button>
                <Button
                    onClick={() => toggleDislikeBtn()}
                    variant='ghost'>
                    {disLikeBtn ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                </Button>
                <Button
                    leftIcon={saveVideo ? <MdPlaylistAddCheck size={20} /> : <RiPlayListAddFill size={20} />}
                    onClick={() => handleSaveVideo()}
                    variant='ghost'
                    isLoading={saveVidLoading}>
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