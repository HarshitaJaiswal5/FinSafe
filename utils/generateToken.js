const jwt = require('jsonwebtoken');
const secretKey = "jan@24";
function generateToken(payload){
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '7h'
    })
 
    return token;
};

module.exports = {
    generateToken,
};