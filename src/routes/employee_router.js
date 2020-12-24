var express = require('express');
var router = express.Router();

const EmployeesController = require('../controllers/employee_controllers')



//LOGIN
router.post('/login', EmployeesController.bindMethod('login'));

//INDEX
router.get('/', EmployeesController.bindMethod('index'));
//SHOW
router.get('/:id', EmployeesController.bindMethod('show'));
//STORE
router.post('/', EmployeesController.bindMethod('store'));
//UPDATE
router.patch('/:id', EmployeesController.bindMethod('update'));
//REMOVE
router.delete('/:id', EmployeesController.bindMethod('remove'));

module.exports = router;