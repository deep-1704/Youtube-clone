import React, { useState } from 'react'

import {
    Stack,
    Flex,
    Heading,
    Input,
    Button
} from '@chakra-ui/react'
import Comment from './Comment';

function Comments() {
    let commentCount = 1000
    let myComment = false;
    let [comment, setComment] = useState(''); // comment state

    function handleAddComment() {
        console.log('Add comment:', comment);
    }

    let comments = [
        {
            _id: 1,
            user: 'User1',
            comment: 'The funny part isn’t that it’s ridiculously easy to break, but the company’s who make them do everything to make them as hard to fix as possible'
        },
        {
            _id: 2,
            user: 'User2',
            comment: 'I don’t think it’s funny that they make them hard to fix. It’s a way to make more money.'
        },
        {
            _id: 3,
            user: 'User3',
            comment: 'I think it’s funny that people are so surprised that they are easy to break.'
        },
        {
            _id: 4,
            user: 'User4',
            comment: 'I completely agree with User1. Companies intentionally make their products hard to fix to increase profits.'
        },
        {
            _id: 5,
            user: 'User5',
            comment: 'It\'s frustrating when you buy a product and can\'t repair it yourself.'
        }
    ]
    return (
        <Stack gap={5}>
            <Heading size='md'>{formatNumber(commentCount)} Comments</Heading>
            {
                myComment ?
                    <></>
                    :
                    <Flex gap={3}>
                        <Input placeholder='Add a public comment...' variant='flushed' onChange={(e) => setComment(e.target.value)} />
                        <Button colorScheme='gray' onClick={() => handleAddComment()}>Add</Button>
                    </Flex>
            }
            <Stack gap={3}>
                {comments.map(comment => (
                    <Comment key={comment._id} user={comment.user} comment={comment.comment} />
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