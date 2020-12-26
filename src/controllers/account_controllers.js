const Account = require('../models').Account
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');
const invalidResponse = require('../responses/invalid_response');
const ResourceController = require("./resource_controller");

class AccountsController extends ResourceController {

    constructor() {
            super()
            this.setModel(Account);
        }
        //depositar
    async deposit(req, res, next) {
            try {

                const entityOld = await Account.getId(req.params.id);

                let balance = entityOld.balance += req.body.balance;

                const entityNew = await entityOld.update({ balance: balance });
                if (entityNew !== "") {
                    return successResponse(res, 200, `Deposito realizado com sucesso `, entityNew)
                }



            } catch (error) {
                console.log(error)
                if (error.name && error.name.includes('SequelizeValidation')) {
                    return invalidResponse(res, 400, `Dados informados sao invalidos `, error)

                }
                return errorResponse(res, 500, `Não foi possivel Depositar `, error)


            }

        }
        //Levantar
    async rise(req, res, next) {
        try {

            const entityOld = await Account.getId(req.params.id);
            if (entityOld.balance > req.body.balance) {
                let balance = entityOld.balance += req.body.balance;

                const entityNew = await entityOld.update({ balance: balance });
                return successResponse(res, 200, `Levantamento realizado com sucesso em `, entityNew)

            } else {
                return successResponse(res, 200, `Erro: Saldo Insuficiente`, null)

            }

        } catch (error) {
            console.log(error)
            if (error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, `Dados informados sao invalidos `, error)

            }
            return errorResponse(res, 500, `Não foi possivel Levantrar`, error)


        }

    }


}

module.exports = new AccountsController