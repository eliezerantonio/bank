const Card = require('../models').Card;
const ResourceController = require('./resource_controller');

class CardController extends ResourceController {
    constructor() {
        super();
        this.setModel(Card)
    }
}

module.exports = new CardController