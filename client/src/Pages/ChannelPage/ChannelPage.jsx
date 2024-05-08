import React from 'react'
import style from '../style.module.css'

import sampleVideo from '../../Assets/videos/sample.mov'
import VideoGrid from '../../Components/VideoGrid/VideoGrid';
import EditChannel from '../../Components/ChannelBtns/EditChannel';
import UploadVideo from '../../Components/ChannelBtns/UploadVideo';

import {
    Stack,
    Flex,
    Text,
    Avatar,
    Heading,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

function ChannelPage() {
    let { cid } = useParams();
    let currentUser = "MrBeast"
    let channel = {
        channelName: 'MrBeast',
        channelDescription: 'This is a channel description',
        channelOwner: 'MrBeast',
    }

    let channelVideos = [
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
        <div className={style.ChannelContainer} style={{ width: "calc(100vw - 90px)", padding: "20px" }}>
            <Stack width='100%' alignItems='center' gap={3}>
                <Stack width='60%' alignItems='center' gap={4}>
                    <Avatar name={channel.channelName} size='2xl' />
                    <Heading as='h2' size='2xl'>{channel.channelName}</Heading>
                    <Text>{channel.channelDescription}</Text>
                    {
                        (currentUser === channel.channelOwner) ?
                            <Flex gap={4}>
                                <EditChannel channel={channel}/>
                                <UploadVideo channel={channel} />
                            </Flex>
                            :
                            <></>
                    }
                </Stack>
                <Stack width='100%'>
                    <Heading as='h3' size='lg' marginLeft={10}>Videos</Heading>
                    <VideoGrid videos={channelVideos} />
                </Stack>
            </Stack>
        </div>
    )
}

export default ChannelPage