import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import {
    fetchAllVideos,
    fetchVideosByTag,
    fetchVideosByChannelName,
    insertVideo,
    fetchVideoById,
    increaseViewCount,
    fetchVIdeosByTitleMatch
} from '../dao/videoDao.js';

import upload from '../controller/videoController.js';

import { video } from '../models/models.js';

let videoRouter = express.Router();

videoRouter.get('/', async (req, res) => {
    let videos = await fetchAllVideos();
    res.status(200).send(videos);
})

videoRouter.get('/tags/:tag/:userId', async (req, res) => {
    let tag = req.params.tag;
    let token = (req.headers.authorization).split(' ')[1];

    if ((tag !== 'hs') && (tag !== 'wl') && (tag !== 'lk') && (tag !== 'dlk')) {
        res.status(400).send('Invalid tag');
        return;
    }
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }

    let userId = req.params.userId;

    let videos = await fetchVideosByTag(userId, tag);
    res.status(200).send(videos);
})

videoRouter.get('/channel/:channelName', async (req, res) => {
    let channelName = req.params.channelName;

    let videos = await fetchVideosByChannelName(channelName);
    res.status(200).send(videos);
})

videoRouter.get('/search/:title', async (req, res) =>{
    let title = req.params.title;

    let videos = await fetchVIdeosByTitleMatch(title);
    res.status(200).send(videos);
})

videoRouter.post('/', upload.single('userVideo'), async (req, res) => {
    let token = (req.headers.authorization).split(' ')[1];

    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    let decoded = jwt.decode(token);
    if (!decoded) {
        res.status(401).send('Unauthorized');
        return;
    }

    let newVideo = req.body;

    let videoObj = new video(
        null,
        newVideo.channelName,
        newVideo.videoTitle,
        newVideo.videoDescription,
        0,
        0,
        0,
        new Date(),
        req.file.originalname.split('.')[0]
    )

    await insertVideo(videoObj);
    res.sendStatus(201)
})

videoRouter.get('/:videoId', (req, res) => {
    let videoId = req.params.videoId;
    console.log(videoId);
    let filePath = `./uploads/${videoId}.mp4`;

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(206, head);
        file.pipe(res);
    }
    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res)
    }
})

videoRouter.get('/info/:videoId', async (req, res) => {
    let videoId = req.params.videoId;

    let theVideo = await fetchVideoById(videoId);

    if (theVideo === null) {
        res.status(404);
        return;
    }

    await increaseViewCount(videoId);

    let videoInfo = {
        _id: theVideo._id,
        channelName: theVideo.channelName,
        title: theVideo.title,
        description: theVideo.description,
        likeCount: theVideo.likeCount,
        viewCount: theVideo.viewCount,
        commentCount: theVideo.commentCount,
        dateOfUpload: theVideo.dateOfUpload,
        originalName: theVideo.originalName
    }

    res.status(200).send(videoInfo);
})

export default videoRouter;