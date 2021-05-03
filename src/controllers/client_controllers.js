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
                return;
            }
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

    /* async update(req, res, next) {
        const idEmpo = await req.body.token.id;
        await HistoryClient.create({
            clientId: req.params.id,
            employeeId: parseInt(idEmpo),
            description: "U",
        });


        return await super.update(req, res, next)
    }*/

    async delete(req, res, next) {
            try {

                const entityOld = await this.Client.getId(req.params.id);

                const entityNew = await entityOld.update(req.body);
                return successResponse(res, 200, `Sucesso ao eliminar`, entityNew)

            } catch (error) {
                if (error.name && error.name.includes('SequelizeValidation')) {
                    return invalidResponse(res, 400, `Dados informados sao invalidos `, error)

                }
                return errorResponse(res, 500, `Não foi possivel Eliminar`, error)
            }
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