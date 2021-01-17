const Account = require('../models').Client
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');
const invalidResponse = require('../responses/invalid_response');
const ResourceController = require("./resource_controller");

class HistoryController extends ResourceController {

    constructor() {
        super()
        this.setModel(Client);
    }

}

module.exports= new HistoryController;