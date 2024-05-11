import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
    Spinner,
} from '@chakra-ui/react'

import { getVideosBySearch } from '../../Api/api';
import VideoGrid from '../../Components/VideoGrid/VideoGrid';

function SearchPage() {
    let { query } = useParams();

    let [videos, setVideos] = useState(null)
    useEffect(() => {
        async function fetchVideos() {
            let response = await getVideosBySearch(query)
            if (response?.status === 200) {
                setVideos(response?.data)
            } else {
                console.log("Error fetching videos")
            }
        }
        fetchVideos()
    }, [])

    return (
        <>
            {
                videos ? <VideoGrid videos={videos} /> : <Spinner />
            }
        </>
    )
}

export default SearchPage