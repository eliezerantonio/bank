module.exports = (res, httpStatus, message, error) => {
    return res.status(httpStatus).json({
        status: "ERROR",
        message: message,
        error: error

    })
}