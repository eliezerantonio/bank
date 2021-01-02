var express = require('express');
var router = express.Router();

const ClientsController = require('../controllers/client_controllers')
const AccountsController = require('../controllers/account_controllers')
const verifyAccessToken = require("../middlewares/verifyAccessToken_middleware");


//LOGIN
router.post('/login', ClientsController.bindMethod('login'));

//INDEX
router.get('/', ClientsController.bindMethod('index'));
//SHOW
router.get('/:id', ClientsController.bindMethod('show'));
//STORE
router.post('/', ClientsController.bindMethod('store'));
//UPDATE
router.patch('/:id', verifyAccessToken, ClientsController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessToken, ClientsController.bindMethod('remove'));


//Account

router.get('/:clientId/account/:id', AccountsController.bindMethod('show'));
/* account Store */
router.post('/account', AccountsController.bindMethod('store'));

//account UPDATE
router.patch('/:clientId/account/:id', AccountsController.bindMethod('update'));

//account deposit
router.patch('/:clientId/account/deposit/:id', AccountsController.deposit);

//account raise
router.patch('/:clientId/account/raise/:id', AccountsController.raise);

//account transfer
router.patch('/:clientId/account/transfer/:id', AccountsController.transfer);

// account REMOVE
router.delete('/:clientId/account/:id', AccountsController.bindMethod('remove'));


module.exports = router;