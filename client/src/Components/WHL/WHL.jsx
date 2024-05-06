import React from 'react'
import style from '../style.module.css'

import {
    Heading,
    Stack,
    Flex,
    Text,
} from '@chakra-ui/react'

function WHL({ purpose, videoList }) {
    return (
        <div className={style.WHLContainer} style={{ padding: "30px" }}>
            <Stack>
                <Heading size="lg">{purpose}</Heading>
                <Stack>
                    {videoList.map((video) => {
                        return (
                            <Flex key={video._id} padding='10px' gap={4}>
                                <video src={video.video_src} controls style={{ width: "300px", height: "200px" }} />
                                <Stack marginTop={3}>
                                    <Heading size="md">{video.title}</Heading>
                                    <Flex gap={3}>
                                        <Text as='b'>{video.channel}</Text>
                                        <Text>{formatNumber(video.views)} views</Text>
                                    </Flex>
                                    <Text>{formatDays(Math.floor(((new Date()) - (new Date(video.upload_date))) / (1000 * 60 * 60 * 24)))} ago</Text>
                                </Stack>
                            </Flex>
                        )
                    })}
                </Stack>
            </Stack>
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

export default WHL