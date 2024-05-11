import jwt from 'jsonwebtoken';

import { fetchUserByEmail } from '../dao/userDao.js';

let getUserByEmail = async (token) => {
    let data = jwt.decode(token);
    let user = await fetchUserByEmail(data?.email);
    return user;
}

let getUserByToken = (token) => {
    let user = jwt.decode(token);
    return user;
}

export { getUserByEmail, getUserByToken };