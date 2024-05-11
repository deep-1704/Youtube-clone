import jwt from 'jsonwebtoken';

import { fetchUserByEmail, insertUser } from '../dao/userDao.js';
import { user } from '../models/models.js';

async function login(req, res) {
    let token = req.body.token;
    let data = jwt.decode(token);

    let _user = await fetchUserByEmail(data.email);
    let newUser;
    if (!_user) {
        _user = new user(
            null,
            data.given_name,
            data.family_name,
            data.email,
            data.picture
        );

        newUser = await insertUser(_user);
    }

    res.status(201).send(newUser?.insertedId ? newUser.insertedId : _user._id)
}

export default login;