const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        person_id: user.person_id,
        role: user.role,
    };

    const options = {
        expiresIn: '5h',  
    };

    try {
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        return token;  
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error('Token generation failed');
    }
};

module.exports = generateToken;
