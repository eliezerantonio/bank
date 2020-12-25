const Employee = require("../models").Employee;

const errorResponse = require("../responses/error_response")


module.exports = async(req, res, next) => {

    try {
        if (!req.headers['x-access-token']) {
            return errorResponse(res, 400, 'O header [x-access-token] deve ser informado')
        }

        req.body.token = await Employee.verifyToken(req.headers['x-access-token']);
        req.body.employeeId = parseInt(req.body.token.id);
        const body = req.body.employee = await Employee.getId(req.body.employeeId);
        const accessLevel = body.dataValues.accessLevel

        if (!req.body.employee) {
            return errorResponse(res, 404, 'Usuario não encontrado')
        }

        if (accessLevel != 1) {

            console.log()
            return errorResponse(res, 401, 'Apenas o gerente do Banco tem acesso')
        }
        next()
    } catch (error) {
        return errorResponse(res, 500, 'impossivel validar token de accesso!', error)

    }

}