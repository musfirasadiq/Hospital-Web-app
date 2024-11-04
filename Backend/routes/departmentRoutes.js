const express = require('express');
const router = express.Router();
const departmentController = require('../controller/departmentController');


// Route to get all departments
router.get('/', departmentController.getDepartments);

// Route to add a new department
router.post('/', departmentController.addDepartment);

// Route to get a department by ID
router.get('/:id', departmentController.getDepartmentById);

// Route to update a department by ID
router.put('/:id', departmentController.updateDepartment);

// Route to delete a department by ID
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
