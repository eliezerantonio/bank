var express = require('express');
var router = express.Router();

const ClientsController = require('../controllers/client_controllers')






//LOGIN
router.post('/login', ClientsController.bindMethod('login'));

//INDEX
router.get('/', ClientsController.bindMethod('index'));
//SHOW
router.get('/:id', ClientsController.bindMethod('show'));
//STORE
router.post('/', ClientsController.bindMethod('store'));
//UPDATE
router.patch('/:id', ClientsController.bindMethod('update'));
//REMOVE
router.delete('/:id', ClientsController.bindMethod('remove'));

module.exports = router;