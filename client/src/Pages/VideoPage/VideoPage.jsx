import React from 'react'
import style from '../style.module.css'

import sample from '../../Assets/videos/sample.mov'

import {
    Flex,
    Stack,
    Text,
    Avatar,
    Heading,
} from '@chakra-ui/react'

import UtilButtons from './UtilButtons'
import Comments from '../../Components/Comments/Comments'

function VideoPage() {
    let video = {
        _id: 1,
        video_src: sample,
        title: "10 minutes to escape or the room will explode",
        channel: "MrBeast",
        description: "Description for video 1",
        views: 1000000,
        upload_date: "04/17/2004"
    }
    let date1 = new Date(video.upload_date)
    let date2 = new Date();
    let days = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    return (
        <div className={style.VideoPageContainer} style={{ overflowY: 'scroll', padding: '40px' }}>
            <Flex gap={7}>
                <Stack gap={3} width='65%'>
                    <video src={video.video_src} controls autoPlay width='100%' />
                    <Text as='b' fontSize='20px'>{video.title}</Text>
                    <Flex justifyContent='space-between'>
                        <Flex alignItems='center' gap={3}>
                            <Avatar name={video.channel} src='https://bit.ly/broken-link' />
                            <Stack gap={0}>
                                <Text as='b'>{video.channel}</Text>
                                <Text>{formatNumber(1000000)} subscribers</Text>
                            </Stack>
                        </Flex>
                        <UtilButtons />
                    </Flex>
                    <Stack backgroundColor='#f2f2f2' padding={3} borderRadius={10}>
                        <Text as='b'>{formatNumber(video.views)} views - {formatDays(days)} ago</Text>
                        <Text>{video.description}</Text>
                    </Stack>
                    <Comments />
                </Stack>
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