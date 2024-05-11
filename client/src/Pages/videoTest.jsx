import { useRef, useEffect } from 'react';

import {
    Input,
    Button,
    Stack,
} from '@chakra-ui/react'

const VideoTest = () => {

    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.removeAttribute('src')
            videoRef.current.load()
        }
    })

    async function handleSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        const formData = new FormData();
        formData.append('video', data.userVideoFile);
        console.log(formData);

        let response = await fetch('http://localhost:5500/videoSample', {
            method: 'POST',
            body: formData
        })

        console.log(response.status);
    }

    return (
        <>
            <video ref={videoRef} width='320' height='240' controls autoPlay>
                <source src={`http://localhost:5500/videos`} type='video/mp4'></source>
                Your browser does not support the video tag.
            </video>
            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                <Stack>
                    <Stack>
                        <Input type='file' name='userVideoFile' typeof='video/*' />
                        <Button type='submit'>Submit</Button>
                    </Stack>
                </Stack>
            </form>
        </>
    );
};

export default VideoTest;
