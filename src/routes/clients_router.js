var express = require('express');
var router = express.Router();

const ClientsController = require('../controllers/client_controllers')
const verifyAccessToken = require("../middlewares/verifyAccessToken_middleware");


//LOGIN
router.post('/login', ClientsController.bindMethod('login'));
//INDEX
router.get('/', verifyAccessToken, ClientsController.bindMethod('index'));
//SHOW
router.get('/:id',  ClientsController.bindMethod('show'));
//STORE
router.post('/', verifyAccessToken, ClientsController.bindMethod('store'));

//UPDATE
router.patch('/:id', verifyAccessToken, ClientsController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessToken, ClientsController.bindMethod('remove'));




module.exports = router;