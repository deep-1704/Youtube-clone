import express from 'express';
import jwt from 'jsonwebtoken';

import { deleteHistory, insertUserTag, getUserTags, deleteUserTag } from '../dao/userTagsDao.js';
import { increaseLikeCount, decreaseLikeCount } from '../dao/videoDao.js';
import { userTag } from '../models/models.js';

let tagRouter = express.Router();

tagRouter.delete('/hs/:userId', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send("Unauthorized");
        return;
    }
    let decoded = jwt.decode(token);
    if(!decoded){
        res.status(401).send("Unauthorized");
        return;
    }

    let userId = req.params.userId;
    let deleteResult = await deleteHistory(userId);
    res.status(204).send(deleteResult);
})

tagRouter.post('/:videoId', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send("Unauthorized");
        return;
    }
    let decoded = jwt.decode(token);
    if(!decoded){
        res.status(401).send("Unauthorized");
        return;
    }

    let videoId = req.params.videoId;
    let tagBody = req.body;
    
    if(tagBody.tag === 'lk')await increaseLikeCount(videoId);
    let userTagObj = new userTag(
        null,
        tagBody.userId,
        videoId,
        tagBody.tag,
    )

    let newUserTag = await insertUserTag(userTagObj);
    res.status(201).send(newUserTag);
})

tagRouter.get('/:userId/:videoId', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send("Unauthorized");
        return;
    }
    let decoded = jwt.decode(token);
    if(!decoded){
        res.status(401).send("Unauthorized");
        return;
    }

    let userId = req.params.userId;
    let videoId = req.params.videoId;
    let userTags = await getUserTags(userId, videoId);
    res.status(200).send(userTags);
})

tagRouter.delete('/:userId/:videoId/:tag', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send("Unauthorized");
        return;
    }
    let decoded = jwt.decode(token);
    if(!decoded){
        res.status(401).send("Unauthorized");
        return;
    }

    let userId = req.params.userId;
    let videoId = req.params.videoId;
    let tag = req.params.tag;

    if(tag === 'lk')await decreaseLikeCount(videoId);

    let deleteResult = await deleteUserTag(userId, videoId, tag);
    res.status(204).send(deleteResult);
})

export default tagRouter;

// { acknowledged: true, deletedCount: 2 }