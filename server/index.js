import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import 'dotenv/config'

import userRoutes from './routes/user.js';
import videoRouter from './routes/videos.js';
import channelRouter from './routes/channel.js';
import tagRouter from './routes/userTags.js';
import commentRouter from './routes/comment.js';
import videoSampleRouter from './routes/videoSample.js';

import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use('/user', userRoutes);
app.use('/video', videoRouter);
app.use('/channel', channelRouter);
app.use('/tag', tagRouter);
app.use('/comment', commentRouter);
app.use('/videoSample', videoSampleRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})