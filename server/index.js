import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import 'dotenv/config'

import userRoutes from './routes/user.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
})


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => console.log(err));
