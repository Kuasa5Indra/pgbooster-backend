const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/Response");
const dotenv = require('dotenv');
dotenv.config();

const jwtKey = process.env.JWT_SECRET_KEY
const jwtExpirySeconds = 3600

exports.login = async(req, res) => {
    try {
        // Get credentials from JSON body
        const { username, password } = req.body
        if (!username || !password || username !== process.env.SUPERADMIN_USER || password !== process.env.SUPERADMIN_PASS) {
            // return 401 error is username or password doesn't exist, or if password does
            // not match the password in our records
            return res.status(401).send(errorResponse('Unauthorized', 'Your credentials is invalid'));
        }

        // Create a new token with the username in the payload
        // and which expires 3600 seconds after issue
        const token = jwt.sign({ user: username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })
        return res.send(successResponse("OK", "Login success", {token: token, expire: jwtExpirySeconds}));
    } catch (error) {
        console.log(error);
        return res.status(400).send(errorResponse(`Error on client`, 'It seems something wrong on client'));
    }
}