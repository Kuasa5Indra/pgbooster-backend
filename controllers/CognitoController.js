const { SignUpCommand, GetUserCommand, InitiateAuthCommand, ConfirmSignUpCommand, 
    ForgotPasswordCommand, ConfirmForgotPasswordCommand, GlobalSignOutCommand,
    ChangePasswordCommand, RespondToAuthChallengeCommand, ResendConfirmationCodeCommand } = require("@aws-sdk/client-cognito-identity-provider");
const { cognitoProviderClient } = require("../libs/cognitoProviderClient");
const { successResponse, errorResponse } = require("../utils/Response");
const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.APP_CLIENT_ID;

const getToken = (request) => {
    return request.headers.authorization.split(' ')[1];
}

exports.getUser = async(req, res) => {
    var token = getToken(req);
    try {
        const params = {
            AccessToken: token
        }
        const command = new GetUserCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "Success get information about user", response.UserAttributes));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.signIn = async(req, res) => {
    const { email, password } = req.body;
    
    try {
        const params = {
            ClientId: clientId,
            AuthFlow: 'USER_PASSWORD_AUTH',
            AuthParameters: {
                'USERNAME': email,
                'PASSWORD': password
            }
        }
        const command = new InitiateAuthCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "Login success", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.signOut = async(req, res) => {
    var token = getToken(req);
    try {
        const params = {
            AccessToken: token
        }
        const command = new GlobalSignOutCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "Logout success"));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.signUp = async(req, res) => {
    const { name, email, phone_number, gender, birthdate, password } = req.body;
    let user_attribute = [];
    user_attribute.push({ Name: 'name', Value: name});
    user_attribute.push({ Name: 'email', Value: email});
    user_attribute.push({ Name: 'phone_number', Value: phone_number});
    user_attribute.push({ Name: 'gender', Value: gender});
    user_attribute.push({ Name: 'birthdate', Value: birthdate});
    
    try {
        const params = {
            ClientId: clientId,
            Username: email,
            Password: password,
            UserAttributes: user_attribute
        }
        const command = new SignUpCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "Success register user", response.CodeDeliveryDetails));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.confirmSignUp = async(req, res) => {
    const { email, code } = req.body;

    try {
        const params = {
            ClientId: clientId,
            Username: email,
            ConfirmationCode: code,
        }
        const command = new ConfirmSignUpCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "Success confirms user registration", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.forgotPassword = async(req, res) => {
    const { email } = req.body;
    
    try {
        const params = {
            ClientId: clientId,
            Username: email,
        }
        const command = new ForgotPasswordCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "We will send a password reset through your email", response.CodeDeliveryDetails));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.confirmForgotPassword = async(req, res) => {
    const { email, password, code } = req.body;
    
    try {
        const params = {
            ClientId: clientId,
            Username: email,
            Password: password,
            ConfirmationCode: code,
        }
        const command = new ConfirmForgotPasswordCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "Your password has been changed successfully", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.changePassword = async(req, res) => {
    const { old_password, new_password } = req.body;
    var token = getToken(req);

    try {
        const params = {
            AccessToken: token,
            PreviousPassword: old_password,
            ProposedPassword: new_password,
        }
        const command = new ChangePasswordCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "Your password has been changed successfully", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.newPasswordChallenge = async(req, res) => {
    const { email, new_password } = req.body;

    try {
        const params = {
            Session: req.headers.session,
            ClientId: clientId,
            ChallengeName: 'NEW_PASSWORD_REQUIRED',
            ChallengeResponses: {
                USERNAME: email,
                NEW_PASSWORD: new_password
            }
        }
        const command = new RespondToAuthChallengeCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "Your password has been changed successfully", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.refreshToken = async(req, res) => {
    try {
        const params = {
            ClientId: clientId,
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            AuthParameters: {
                'REFRESH_TOKEN': req.header('refresh_token')
            }
        }
        const command = new InitiateAuthCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "New Access Token has been refreshed", response));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}

exports.resendConfirmationCode = async(req, res) => {
    try {
        const params = {
            ClientId: clientId,
            Username: req.body.email
        }
        const command = new ResendConfirmationCodeCommand(params);
        const response = await cognitoProviderClient.send(command);
        return res.send(successResponse("OK", "New Confirmation Code has successfully sent, Please check your email", response.CodeDeliveryDetails));
    } catch (error) {
        console.log(error);
        return res.status(error.$metadata.httpStatusCode).send(errorResponse(`Error on ${error.$fault}`, error.name));
    }
}
