import React, { useState, useEffect } from 'react'

import { getCommentsByVideoId, postComment } from '../../Api/api';

import {
    Stack,
    Flex,
    Heading,
    Input,
    Button
} from '@chakra-ui/react'
import Comment from './Comment';

function Comments({ video }) {
    let userId = localStorage.getItem('user_id');
    let token = localStorage.getItem('token');

    let [myComment, setMyComment] = useState(false); 
    let [comment, setComment] = useState(''); 
    let [comments, setComments] = useState([]); // [comment1, comment2, comment3, ...]
    let [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        async function fetchComments(){
            let response = await getCommentsByVideoId(video._id)
            if(response.status === 200){
                setComments(response.data)
            }else{
                console.log('Error fetching comments')
            }

            // Check if user has already commented and update state
            let userComment = response.data.find(comment => comment.userId === userId)
            if(userComment) setMyComment(true)
        }
        fetchComments()
    }, [])

    async function handleAddComment() {
        setIsLoading(true)
        if(comment === ''){
            setIsLoading(false)
            return
        }

        let response = await postComment(token, userId, video._id, comment)
        if(response.status === 201){
            setMyComment(true)
            window.location.reload()
        }else if(response.status === 401){
            alert('Unauthorized')
        }else{
            alert('Error adding comment')
        }
        setIsLoading(false)
    }
    return (
        <Stack gap={5}>
            <Heading size='md'>{formatNumber(video.commentCount)} Comments</Heading>
            {
                myComment ?
                    <></>
                    :
                    <Flex gap={3}>
                        <Input placeholder='Add a public comment...' variant='flushed' onChange={(e) => setComment(e.target.value)} />
                        <Button isLoading={isLoading} colorScheme='gray' onClick={() => handleAddComment()}>Add</Button>
                    </Flex>
            }
            <Stack gap={3}>
                {comments.map(_comment => (
                    <Comment key={_comment._id} user={_comment.firstName+ ' ' +_comment.lastName} comment={_comment.comment} userId={_comment.userId} commentId={_comment._id} videoId={_comment.videoId}/>
                ))}
            </Stack>
        </Stack>
    )
}

function formatNumber(number) {
    return number.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'short'
    });
}

export default Comments