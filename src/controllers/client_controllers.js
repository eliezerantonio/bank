const Client = require('../models').Client
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

    async saveHistory (req,res,next){
          //salvar o historico
          try {
            const entity = await HistoryClient.create({
                clientId: entityOld.id,
                employeeId: req.body.token.id,
            });

            console.log(entity);

            return successResponse(res, 200, null, entity)

        } catch (error) {
            if (error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, `Dados informados sao invalidos `, error)

            } else if (error.name && error.name.includes("SequelizeUniqueConstraintError")) {
                return invalidResponse(res, 400, `Dados informados ja existentes `, error)
            }
            console.log(error)
            return errorResponse(res, 500, `Não foi possivel criar o historico do Cliente`, error)


        }

        //salvar o historico
   
    }
 
}

module.exports = new ClientsController