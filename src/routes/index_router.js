var express = require('express');
var router = express.Router();

const ClientssController = require('./clients_router')


const verifyAccessToken = require('./middlewares/verifyAccessToken_middleware')
const verifyOwner = require('./middlewares/verifyOwner_middleware')
const upload = require('./middlewares/upload_middleware')

const onlyAllowsOwner = [verifyAccessToken, verifyOwner]

//LOGIN
router.post('/login', ClientssController.bindMethod('login'));

//INDEX
router.get('/', ClientssController.bindMethod('index'));
//SHOW
router.get('/:id', ClientssController.bindMethod('show'));
//STORE
router.post('/', ClientssController.bindMethod('store'));
//UPDATE
router.patch('/:id', ClientssController.bindMethod('update'));
//REMOVE
router.delete('/:id', ClientssController.bindMethod('remove'));

module.exports = router;