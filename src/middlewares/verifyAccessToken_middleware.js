const User = require("../models").User;

const errorResponse = require("../responses/error_response")


module.exports = async(req, res, next) => {

    try {
        if (!req.headers['x-access-token']) {
            return errorResponse(res, 400, 'O header [x-access-token] deve ser informado')
        }

        req.body.token = await User.verifyToken(req.headers['x-access-token']);
        req.body.userId = parseInt(req.body.token.id)
        req.body.user = await User.getId(req.body.userId)

        if (!req.body.user) {
            return errorResponse(res, 400, 'Usuario não encontrado')
        }

        next()
    } catch (error) {
        return errorResponse(res, 500, 'impossivel validar token de accesso!', error)

    }

}