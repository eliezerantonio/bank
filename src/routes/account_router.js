var express = require('express');
var router = express.Router();

const AccountsController = require('../controllers/account_controllers')
    /*
    const verifyAccessToken = require('./middlewares/verifyAccessToken_middleware')
    const verifyOwner = require('./middlewares/verifyOwner_middleware')
    const upload = require('./middlewares/upload_middleware')

    const onlyAllowsOwner = [verifyAccessToken, verifyOwner]
*/


//Account
router.get('/', AccountsController.bindMethod('index'));

// FUNCIONARIO
router.get('/:id', AccountsController.bindMethod('show'));
/* account Store */
router.post('/', AccountsController.bindMethod('store'));

//account UPDATE
router.patch('/:id', AccountsController.bindMethod('update'));

//account deposit
router.patch('/deposit/:id', AccountsController.deposit);

//account raise
router.patch('/raise/:id', AccountsController.raise);

//account transfer
router.patch('/transfer/:id', AccountsController.transfer);
// account REMOVE
router.delete('/:id', AccountsController.bindMethod('remove'));



//Usuario logaDO
router.get('/:clientId/:id', AccountsController.bindMethod('show'));

//account raise
router.patch('/:clientId/raise/:id', AccountsController.raise);

//account transfer
router.patch('/:clientId/transfer/:id', AccountsController.transfer);




module.exports = router;