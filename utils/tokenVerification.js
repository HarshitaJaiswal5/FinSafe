const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'platinum';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Token not provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;
