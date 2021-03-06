const CardAccount = require('../models').CardAccount
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');
const invalidResponse = require('../responses/invalid_response');
const ResourceController = require('./resource_controller');

class CardAccountsController extends ResourceController {
    constructor() {
        super();
        this.setModel(CardAccount)
    }

     //REALIZAR DEPOSITO
     async deposit(req, res, next) {

        try {

            const entityOld = await CardAccount.getId(req.params.id);

            if (req.body.balance > 0) {

                if (entityOld.state){
                    let balance = entityOld.balance += req.body.balance;

                const entityNew = await entityOld.update({ balance: balance });
                if (entityNew !== "") {
                    return successResponse(res, 200, ` Deposito realizado com sucesso `, entityNew)
                }
                }else {
                    return successResponse(res, 500, `conta desativada `, null)

                }

            } else {
                return successResponse(res, 500, ` Não foi possivel Depositar `, null)
            }

        } catch (error) {
            console.log(error)
            if (error.name && error.name.includes('SequelizeValidation')) {
                return invalidResponse(res, 400, ` Dados informados sao invalidos `, error)

            }
            return errorResponse(res, 500, ` Não foi possivel Depositar `, error)


        }

    }
    //REALIZAR LEVATAMENTO
async raise(req, res, next) {

    try {

        const entityOld = await CardAccount.getId(req.params.id);


        //so deposita de tiver saldo
        if (entityOld.balance >= req.body.balance && req.body.balance > 0) {

        if (entityOld.state){
            
            let balance = entityOld.balance -= req.body.balance;

            const entityNew = await entityOld.update({ balance: balance });
            return successResponse(res, 200, `Levantamento realizado com sucesso em `, entityNew)

         
        }else{
            return errorResponse(res, 500, `conta desactivada`, null)


        }

            

        } else {
            return errorResponse(res, 500, ` Erro: Saldo Insuficiente Ou Verifique o valor `, null)

        }

    } catch (error) {
        console.log(error)
        if (error.name && error.name.includes('SequelizeValidation')) {
            return invalidResponse(res, 400, `Dados informados sao invalidos `, error)

        }



    }




}

    // REALIZAR TRANSFERÊNCIA
async transfer(req, res, next) {


    try {


        //consta origem
        const entityOld = await CardAccount.getId(req.params.id);

        //so deposita de tiver saldo
        if (entityOld.balance >= req.body.balance && req.body.balance > 0) {

            const balance = entityOld.balance -= req.body.balance;
            const value = req.body.balance;

            const entityNew2 = await entityOld.update({ balance: balance });
            if (entityNew2 !== "") {

                // conta destino
                const entityOld = await CardAccount.getId(req.body.id);

                if (req.body.balance > 0) {
                    // conta destino
                    const balance = entityOld.balance += req.body.balance;

                    const entityNew = await entityOld.update({ balance: balance });
                    if (entityNew !== "") {
                        return successResponse(res, 200, ` Tranferencia de ${value} KZ `, entityNew2);
                    }

                } else {
                    return successResponse(res, 500, ` Não foi possivel Depositar `, null);
                }
            }

        } else {
            return errorResponse(res, 500, ` Erro: Saldo Insuficiente Ou Verifique o valor `, null);

        }



    } catch (error) {

    }

}
}

module.exports = new CardAccountsController