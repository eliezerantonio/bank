const Loan = require('../models').Loan;
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');
const invalidResponse = require('../responses/invalid_response');
const ResourceController = require("./resource_controller");
class LoanController extends ResourceController{

    constructor() {
        super()
        this.setModel(Loan);
    }

}


module.exports= new LoanController