const Client = require('../models').Client
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');
const ResourceController = require("./resource_controller");

class ClientsController extends ResourceController {

    constructor() {
        super()
        this.setModel(Client);
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;


            const result = await Client.verifyLogin(email, password)

            successResponse(res, 200, "Usuario autenticado com sucesso!", result)
        } catch (error) {
            console.log(error);
            errorResponse(res, 500, " Nao foi possivel autenticar")
        }
    }

    async update(req, res, next) {
        if (req.file) {
            req.body.pic = req.protocol + '://' + req.headers.host + '/uploads/' + req.file.filename
        }
        return await super.update(req, res, next)
    }

}

module.exports = new ClientsController