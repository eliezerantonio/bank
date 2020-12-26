var express = require('express');
var router = express.Router();

const EmployeesController = require('../controllers/employee_controllers')
const verifyAccessManager = require("../middlewares/verifyAccessManager_middleware");


//LOGIN
router.post('/login', EmployeesController.bindMethod('login'));

//INDEX
router.get('/', verifyAccessManager, EmployeesController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessManager, EmployeesController.bindMethod('show'));
//STORE
router.post('/', EmployeesController.bindMethod('store'));
//UPDATE
router.patch('/:id', verifyAccessManager, EmployeesController.bindMethod('update'));
//REMOVE
router.delete('/:id', verifyAccessManager, EmployeesController.bindMethod('remove'));

module.exports = router;