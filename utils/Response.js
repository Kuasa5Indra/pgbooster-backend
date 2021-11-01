exports.successResponse = (title, message, data = null) => {
    return {
        "status": title,
        "message": message,
        "data": data
    }
}

exports.errorResponse = (title, message) => {
    return {
        "status": title,
        "message": message
    }
}