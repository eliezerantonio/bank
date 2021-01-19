const Loan = require('../models').Loan;
const HistoryLoan = require('../models').HistoryLoan
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');
const invalidResponse = require('../responses/invalid_response');
const ResourceController = require("./resource_controller");
class LoanController extends ResourceController {

    constructor() {
        super()
        this.setModel(Loan);
    }


    async update(req, res, next) {
        try {
            const idEmpo = await req.body.token.id;
            await HistoryLoan.create({
                clientId: req.params.id,
                employeeId: parseInt(idEmpo),
                description: "U",
            });
        } catch (error) {
            console.log(error)
        }


        return await super.update(req, res, next)
    }


    async remove(req, res, next) {
        try {
            const idEmpo = await req.body.token.id;
            await HistoryLoan.create({
                clientId: req.params.id,
                employeeId: parseInt(idEmpo),
                description: "D",
            });
        } catch (error) {

        }


        return await super.remove(req, res, next)
    }
}


module.exports = new LoanController