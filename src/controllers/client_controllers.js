const Client = require('../models').Client
const HistorySession = require('../models').HistorySession
const HistoryClient = require('../models').HistoryClient
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
            if (result !== "") {
                HistorySession.create({ clientId: result.client.id, employeeId: null, description: 'Nova sessão iniciada', })
                successResponse(res, 200, "Usuario autenticado com sucesso!", result)

            }
        } catch (error) {
            console.log(error);
            errorResponse(res, 500, " Nao foi possivel autenticar")
        }
    }



    async update(req, res, next) {
            const idEmpo = await req.body.token.id;
            await HistoryClient.create({
                clientId: req.params.id,
                employeeId: parseInt(idEmpo),
                description: "U",
            });


            return await super.update(req, res, next)
        }
        //REMOVE
    async remove(req, res, next) {
        try {
            const idEmpo = await req.body.token.id;
            await HistoryClient.create({
                clientId: req.params.id,
                employeeId: parseInt(idEmpo),
                description: "R",
            });
        } catch (error) {
            console.log(error);

        }
        return await super.remove(req, res, next)
    }
}

module.exports = new ClientsController