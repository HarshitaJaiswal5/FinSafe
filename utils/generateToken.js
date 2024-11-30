const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'diamond';  // Use an environment variable for secret

const generateToken = (user) => {

    const payload = {
        person_id: user.person_id,
        role: user.role,
    };
    

    const options = {
        expiresIn: '5h',  // Token expiration time (e.g., 5 hours)
    };

    try {
        const token = jwt.sign(payload, JWT_SECRET, options);
        return token;  // Return the generated token
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error('Token generation failed');
    }
};

module.exports = generateToken;
