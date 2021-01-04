var express = require('express');
var router = express.Router();

const CardControllers = require("../controllers/card_controllers")
router.get('/', CardControllers.bindMethod('index'));


module.exports = router;