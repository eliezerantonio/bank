const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload_middleware')
const EmployeesController = require('../controllers/employee_controllers')
const VerifyAccessToken = require("../middlewares/verifyAccessToken_middleware");
const VerifyAccessManager = require("../middlewares/verifyAccessManager_middleware");

//LOGIN
router.post('/login', EmployeesController.bindMethod('login'));

//INDEX
router.get('/', VerifyAccessManager, EmployeesController.bindMethod('index'));
//SHOW
router.get('/:id', EmployeesController.bindMethod('show'));
//STORE
router.post('/', EmployeesController.bindMethod('store'));
//UPDATE
router.patch('/:id', VerifyAccessToken, upload.single('pic'), EmployeesController.bindMethod('update'));
//REMOVE
router.delete('/:id', VerifyAccessManager, EmployeesController.bindMethod('remove'));

module.exports = router;