const { errorResponse } = require('../utils/Response');

exports.clientErrorHandler = (req, res, next) => {
    return res.status(404).send(errorResponse("Not Found", "URL you are looking cannot be found"));
}