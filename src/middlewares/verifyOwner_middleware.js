const errorRes = require('../responses/error_response')

module.exports = async(req, res, next) => {
    const userId = parseInt(req.params.userId ? req.params.userId : req.params.id)

    if (userId !== req.body.user.id) {
        return errorRes(res, 400, 'Você não tem permissão para acessar esse recurso.')
    }

    next()
}