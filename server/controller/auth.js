import jwt from 'jsonwebtoken';

async function login(req, res) {
    let token = req.body.token;
    let data = jwt.decode(token);
    
}

export default login;