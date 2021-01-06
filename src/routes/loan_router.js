var express = require('express');
var router = express.Router();

const LoanController = require('../controllers/loan_controller')
const verifyAccessToken = require("../middlewares/verifyAccessToken_middleware");


//INDEX
router.get('/', LoanController.bindMethod('index'));
//SHOW
router.get('/:id', LoanController.bindMethod('show'));
//STORE
router.post('/', LoanController.bindMethod('store'));
//UPDATE
router.patch('/:id', LoanController.bindMethod('update'));
//REMOVE
router.delete('/:id', LoanController.bindMethod('remove'));

module.exports = router;