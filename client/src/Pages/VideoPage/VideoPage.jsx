import React, { useState, useEffect, useRef } from 'react'
import style from '../style.module.css'

import { getVideoInfoById } from '../../Api/api'
import { useParams } from 'react-router-dom'

import {
    Flex,
    Stack,
    Text,
    Avatar,
    Heading,
    Spinner,
} from '@chakra-ui/react'

import UtilButtons from './UtilButtons'
import Comments from '../../Components/Comments/Comments'

function VideoPage() {
    let { videoId } = useParams()

    let [video, setVideo] = useState(null)
    const videoRef = useRef(null)

    useEffect(() => {
        async function fetchVideo() {
            let response = await getVideoInfoById(videoId)
            if (response.status === 200) {
                setVideo(response.data)
            } else {
                console.log('Error:', response)
            }
        }
        fetchVideo()
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.removeAttribute('src')
            videoRef.current.load()
        }
    }, [])

    let date1 = new Date(video?.dateOfUpload)
    let date2 = new Date();
    let days = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    let url = process.env.REACT_APP_API_URL
    console.log(`${url}/${video?.originalName}`)  

    return (
        <div className={style.VideoPageContainer} style={{ overflowY: 'scroll', padding: '40px' }}>
            <Flex gap={7}>
                {
                    video ?
                        (
                            <Stack gap={3} width='65%'>
                                <video ref={videoRef} controls autoPlay width='100%' >
                                    <source src={`${url}/video/${video?.originalName}`} type='video/mp4'></source>
                                    Your browser does not support the video tag.
                                </video>
                                <Text as='b' fontSize='20px'>{video?.title}</Text>
                                <Flex justifyContent='space-between'>
                                    <Flex alignItems='center' gap={3}>
                                        <Avatar name={video?.channelName} src='https://bit.ly/broken-link' />
                                        <Stack gap={0}>
                                            <Text as='b'>{video?.channelName}</Text>
                                            <Text>{formatNumber(1000000)} subscribers</Text>
                                        </Stack>
                                    </Flex>
                                    <UtilButtons video={video} />
                                </Flex>
                                <Stack backgroundColor='#f2f2f2' padding={3} borderRadius={10}>
                                    <Text as='b'>{formatNumber(video?.viewCount)} views - {formatDays(days)} ago</Text>
                                    <Text>{video?.description}</Text>
                                </Stack>
                                <Comments video={video} />
                            </Stack>
                        )
                        :
                        <Spinner />
                }
                <Heading size='xl'>Up Next</Heading>
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

export default VideoPage