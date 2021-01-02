const AccountCard = require('../models').AccountCard

const ResourceController = require('./resource_controller');

class AccountCardsController extends ResourceController {
    constructor() {
        super();
        this.setModel(AccountCard)
    }
}

module.exports = new AccountCardsController