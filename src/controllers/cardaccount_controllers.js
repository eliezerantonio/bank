const CardAccount = require('../models').CardAccount

const ResourceController = require('./resource_controller');

class CardAccountsController extends ResourceController {
    constructor() {
        super();
        this.setModel(CardAccount)
    }
}

module.exports = new CardAccountsController