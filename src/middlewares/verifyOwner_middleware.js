const errorRes = require('../responses/error_response')

module.exports = async(req, res, next) => {
    const userId = parseInt(req.params.id ? req.params.id : req.params.id)

    if (userId !== req.body.user.id) {
        return errorRes(res, 400, 'Você não tem permissão para acessar esse recurso.')
    }

    next()
}