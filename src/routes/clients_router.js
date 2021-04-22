var express = require('express');
var router = express.Router();
const upload = require('../middlewares/upload_middleware')
const ClientsController = require('../controllers/client_controllers')
const verifyAccessToken = require("../middlewares/verifyAccessTokenClient_middleware");
const verifyAccessToken2 = require("../middlewares/verifyAccessToken_middleware");
const verifyOwner = require("../middlewares/verifyOwner_middleware");
const verifyAccessManager = require("../middlewares/verifyAccessManager_middleware");

//LOGIN
router.post('/login', ClientsController.bindMethod('login'));
//INDEX
router.get('/', ClientsController.bindMethod('index'));
//SHOW
router.get('/:id', ClientsController.bindMethod('show'));
//STORE
router.post('/', ClientsController.bindMethod('store'));

//UPDATE
router.patch('/:id', verifyAccessToken, upload.single('pic'), ClientsController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessToken, ClientsController.bindMethod('remove'));


module.exports = router;