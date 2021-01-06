var express = require('express');
var router = express.Router();

const LoanController = require('../controllers/loan_controller')
const verifyAccessToken = require("../middlewares/verifyAccessToken_middleware");
const { route } = require('./clients_router');

//INDEX
router.get('/', LoanController.bindMethod('index'));
//SHOW
router.get('/:id', LoanController.bindMethod('show'));
//STORE
router.post('/', LoanController.bindMethod('store'));
//UPDATE
router.patch('/:id', verifyAccessToken, LoanController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessToken, LoanController.bindMethod('remove'));

module.exports = router;
