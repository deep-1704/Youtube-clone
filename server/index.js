import express from 'express';
import cors from 'cors';

import 'dotenv/config'

import userRoutes from './routes/user.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use('/user', userRoutes);


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})