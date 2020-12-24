module.exports = (res, httpStatus, message, data, meta) => {
    return res.status(httpStatus).json({
        status: "SUCCESS",
        message: message,
        data: data,
        meta: meta

    })
}