const { CognitoJwtVerifier } = require("aws-jwt-verify");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/Response");
const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.APP_CLIENT_ID;
const userPoolId = process.env.USER_POOL_ID;

const getToken = (request) => {
    return request.headers.authorization.split(' ')[1];
}

exports.verifyAccessToken = async (req, res, next) => {
    if(req.headers.authorization == null){
        return res.status(401).send(errorResponse("Unauthorized", "Token empty"));
    }

    const token = getToken(req);
    
    // Verifier that expects valid access tokens:
    const verifier = CognitoJwtVerifier.create({
        userPoolId: userPoolId,
        tokenUse: "access",
        clientId: clientId,
    });

    try {
        const payload = await verifier.verify(token);
        req.sub = payload.sub;
        next();
    } catch {
        return res.status(401).send(errorResponse("Unauthorized", "Invalid token"));
    }

}

exports.verifyAdminAccessToken = async (req, res, next) => {
    if(req.headers.authorization == null){
        return res.status(401).send(errorResponse("Unauthorized", "Token empty"));
    }

    const token = getToken(req);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch(e) {
        if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).send(errorResponse("Unauthorized", "Invalid token"));
		}
		// otherwise, return a bad request error
		return res.status(400).send(errorResponse("Bad Request", "User made invalid request"));
    }
}