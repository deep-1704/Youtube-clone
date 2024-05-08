import express from 'express';
import login from '../controller/auth.js';

const userRoutes = express.Router();

userRoutes.post('/login', login);

export default userRoutes;