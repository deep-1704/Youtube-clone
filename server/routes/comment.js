import express from 'express';
import jwt from 'jsonwebtoken';

import { fetchCommentsByVideoId, insertComment, updateComment, deleteComment } from '../dao/commentDao.js';
import { decreaseCommentCount } from '../dao/videoDao.js';
import { comment } from '../models/models.js';

let commentRouter = express.Router();

commentRouter.get('/:videoId', async (req, res) => {
    let videoId = req.params.videoId;
    let comments = await fetchCommentsByVideoId(videoId);
    res.status(200).json(comments);
})

commentRouter.post('/', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send('Unauthorized');
        return;
    }
    let decoded = jwt.decode(token);
    if(!decoded){
        res.status(401).send('Unauthorized');
        return;
    }

    let newComment = req.body;
    let newCommentObj = new comment(
        null,
        newComment.userId,
        decoded.given_name,
        decoded.family_name,
        newComment.videoId,
        newComment.comment
    )
    let result = await insertComment(newCommentObj);
    res.status(201).json(result);
})

commentRouter.put('/:commentId', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send('Unauthorized');
        return;
    }
    let decoded = jwt.decode(token);
    if(!decoded){
        res.status(401).send('Unauthorized');
        return;
    }

    let commentId = req.params.commentId;
    let updatedComment = req.body.comment;
    let result = await updateComment(commentId, updatedComment);
    res.status(204).json(result);
})

commentRouter.delete('/:commentId/:videoId', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send('Unauthorized');
        return;
    }
    let decoded = jwt.decode(token);
    if(!decoded){
        res.status(401).send('Unauthorized');
        return;
    }

    let commentId = req.params.commentId;
    let videoId = req.params.videoId;
    let result = await deleteComment(commentId);
    if(result) await decreaseCommentCount(videoId);
    res.status(204).json(result);
})

export default commentRouter;