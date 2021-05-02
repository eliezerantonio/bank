var express = require('express');
var router = express.Router();

const AccountsController = require('../controllers/account_controllers');
const CardAccountsController = require('../controllers/cardaccount_controllers')
const verifyAccessToken = require('../middlewares/verifyAccessToken_middleware')

const verifyOwner = require('../middlewares/verifyOwner_middleware')
    /*

            const upload = require('./middlewares/upload_middleware')
       */
const onlyAllowsOwner = [verifyAccessToken, verifyOwner]



//Account
router.get('/', verifyAccessToken, AccountsController.bindMethod('index'));

// FUNCIONARIO
router.get('/:id', AccountsController.bindMethod('show'));
/* account Store */
router.post('/', verifyAccessToken, AccountsController.bindMethod('store'));

//account UPDATE
router.patch('/:id', verifyAccessToken, AccountsController.bindMethod('update'));

//account deposit
router.patch('/deposit/:id', verifyAccessToken, AccountsController.deposit);

//account raise
router.patch('/raise/:id', verifyAccessToken, AccountsController.raise);

//account transfer
router.patch('/transfer/:id', AccountsController.transfer);
// account REMOVE
router.delete('/:id', verifyAccessToken, AccountsController.bindMethod('remove'));

router.post('/card', verifyAccessToken, CardAccountsController.bindMethod('store'))
router.patch('/card/deposit/:id', verifyAccessToken, CardAccountsController.deposit)
router.patch('/card/raise/:id', verifyAccessToken, CardAccountsController.raise)



//Usuario logaDO
router.get('/:clientId/:id', onlyAllowsOwner, AccountsController.bindMethod('show'));

//account raise
router.patch('/:clientId/raise/:id', onlyAllowsOwner, AccountsController.raise);

//account transfer
router.patch('/:clientId/transfer/:id', onlyAllowsOwner, AccountsController.transfer);


router.get('/moviment/:id', AccountsController.movimentFindById)





module.exports = router;