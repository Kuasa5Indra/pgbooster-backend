const { CognitoJwtVerifier } = require("aws-jwt-verify");
const { successResponse, errorResponse } = require("../utils/Response");
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
        next();
    } catch {
        return res.status(401).send(errorResponse("Unauthorized", "Invalid token"));
    }

}