var express = require('express');
var router = express.Router();

const AccountsController = require('../controllers/account_controllers');
const CardAccountsController = require('../controllers/cardaccount_controllers')
const verifyAccessToken = require('../middlewares/verifyAccessToken_middleware')
const verifyAccessTokenClient = require('../middlewares/verifyAccessTokenClient_middleware')

const verifyOwner = require('../middlewares/verifyOwner_middleware')
    /*

            const upload = require('./middlewares/upload_middleware')
       */
const onlyAllowsOwner = [verifyAccessTokenClient, verifyOwner]



//Account
router.get('/', verifyAccessToken, AccountsController.bindMethod('index'));

// FUNCIONARIO
router.get('/:id', verifyAccessToken, AccountsController.bindMethod('show'));
/* account Store */
router.post('/', verifyAccessToken, AccountsController.bindMethod('store'));

//account UPDATE
router.patch('/:id', verifyAccessTokenClient, AccountsController.bindMethod('update'));

//account deposit
router.patch('/deposit/:id', verifyAccessTokenClient, AccountsController.deposit);

//account raise
router.patch('/raise/:id', verifyAccessTokenClient, AccountsController.raise);

//account transfer
router.patch('/transfer/:id', verifyAccessTokenClient, AccountsController.transfer);
// account REMOVE
router.delete('/:id', verifyAccessTokenClient, AccountsController.bindMethod('remove'));

router.post('/card', verifyAccessToken, CardAccountsController.bindMethod('store'))
router.patch('/card/deposit/:id', verifyAccessToken, CardAccountsController.deposit)
router.patch('/card/raise/:id', verifyAccessToken, CardAccountsController.raise)



//Usuario logaDO
router.get('/client/:id', verifyAccessTokenClient, AccountsController.bindMethod('show'));

//account raise
router.patch('/client/raise/:id', verifyAccessTokenClient, AccountsController.raise);

//account transfer
router.patch('/client/transfer/:id', verifyAccessTokenClient, AccountsController.transfer);


router.get('/moviment/:id', AccountsController.movimentFindById)





module.exports = router;