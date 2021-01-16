const Moviment = require('../models').Moviment
const successResponse = require('../responses/success_response');
const errorResponse = require('../responses/error_response');
const invalidResponse = require('../responses/invalid_response');
const ResourceController = require("./resource_controller");

class MovimentsController extends ResourceController {

    constructor() {
        super()
        this.setModel(Moviment);
    }


    async movimentFindById(req, res, next) {
        try {
            const {
                entities,
                meta
            } = await Moviment.search(req.params.id);

            return successResponse(res, 200, null, entities, meta);

        } catch (error) {
            return errorResponse(res, 500, error, null, null);

        }
    }

}

module.exports = new MovimentsController