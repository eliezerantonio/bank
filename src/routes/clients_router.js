"use strict";
const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload_middleware')

const ClientsController = require('../controllers/client_controllers')

const verifyAccessToken = require("../middlewares/verifyAccessTokenClient_middleware");
const verifyOwner = require("../middlewares/verifyOwner_middleware");
const verifyAccessManager = require("../middlewares/verifyAccessManager_middleware");

const onlyAllowsOwner = [verifyAccessToken, verifyOwner];

//LOGIN
router.post('/login', ClientsController.bindMethod('login'));
//INDEX
router.get('/', ClientsController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, ClientsController.bindMethod('show'));
//STORE
router.post('/', verifyAccessManager, ClientsController.bindMethod('store'));

//UPDATE
router.patch('/:id', onlyAllowsOwner, upload.single('pic'), ClientsController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessManager, ClientsController.bindMethod('remove'));


module.exports = router;