module.exports = (res, httpStatus, mesage, error) => {
    return res.status(httpStatus).json({
        status: "INVALID",
        message: mesage,
        error: error.errors.map(err => {

            return {
                message: err.message,
                field: err.path,
                value: err.value
            }
        })

    })
}