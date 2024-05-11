import React, { useEffect, useState } from 'react'
import style from '../style.module.css'

import VideoGrid from '../../Components/VideoGrid/VideoGrid';
import EditChannel from '../../Components/ChannelBtns/EditChannel';
import UploadVideo from '../../Components/ChannelBtns/UploadVideo';

import { getChannel, getVideosByChannelName } from '../../Api/api';

import {
    Stack,
    Flex,
    Text,
    Avatar,
    Heading,
    Spinner,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

function ChannelPage() {
    let { cid } = useParams();
    let [channel, setChannel] = useState(null)
    let [videos, setVideos] = useState(null)
    let token = localStorage.getItem('token')
    let userID = localStorage.getItem('user_id')

    useEffect(() => {
        async function fetchChannel() {
            let response = await getChannel(token, cid, userID)
            if (response.status === 200) {
                setChannel(response.data)
            } else if (response.status === 401) {
                alert('Unauthorized')
            }
            else {
                alert('Error: ' + response.status)
            }

            let _response = await getVideosByChannelName(response?.data?.name)

            if (_response?.status === 200) {
                setVideos(_response?.data)
            } else {
                console.log('Error: ' + _response)
            }
        }
        fetchChannel()
    }, [])

    return (
        <>
            {
                channel ?
                    <div className={style.ChannelContainer} style={{ width: "calc(100vw - 90px)", padding: "20px" }}>
                        <Stack width='100%' alignItems='center' gap={3}>
                            <Stack width='60%' alignItems='center' gap={4}>
                                <Avatar name={channel?.name} size='2xl' />
                                <Heading as='h2' size='2xl'>{channel?.name}</Heading>
                                <Text>{channel?.description}</Text>
                                {
                                    (userID === channel?.userId) ?
                                        <Flex gap={4}>
                                            <EditChannel channel={channel} />
                                            <UploadVideo channel={channel} />
                                        </Flex>
                                        :
                                        <></>
                                }
                            </Stack>
                            <Stack width='100%'>
                                <Heading as='h3' size='lg' marginLeft={10}>Videos</Heading>
                                {
                                    videos ?
                                        <VideoGrid videos={videos} />
                                        :
                                        <Spinner />
                                }
                            </Stack>
                        </Stack>
                    </div>
                    :
                    <Spinner />
            }
        </>
    )
}

export default ChannelPage