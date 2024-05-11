import express from 'express';
import jwt from 'jsonwebtoken';
import { channel, user } from '../models/models.js';
import { getUserByEmail } from '../controller/userController.js';
import { createChannel, fetchChannelById, updateChannel, fetchChannelByUserId } from '../dao/channelDao.js';

let channelRouter = express.Router();

channelRouter.post('/', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    let data = jwt.decode(token);
    if(!data) {
        res.status(401).send('Unauthorized');
        return;
    }

    let newChannel = req.body;
    let channelObj = new channel(
        null,
        newChannel?.userId,
        newChannel?.name,
        newChannel?.description
    )
    let result = await createChannel(channelObj);
    res.status(201).send(result);
})

channelRouter.get('/:channelId', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    let data = jwt.decode(token);
    if(!data) {
        res.status(401).send('Unauthorized');
        return;
    }

    let channelId = req.params.channelId;
    let userId = req.query.userId;
    let channel;  

    if(channelId === 'me') {
        channel = await fetchChannelByUserId(userId);
    }else{
        channel = await fetchChannelById(channelId);
    }
    res.status(200).send(channel);
})

channelRouter.put('/:channelId', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    let data = jwt.decode(token);
    if(!data) {
        res.status(401).send('Unauthorized');
        return;
    }

    let channelId = req.params.channelId;
    let updatedChannel = req.body;

    let newChannelObj = new channel(
        channelId,
        updatedChannel?.userId,
        updatedChannel?.name,
        updatedChannel?.description
    )

    let result = await updateChannel(channelId, newChannelObj);
    res.sendStatus(204)
})

export default channelRouter;