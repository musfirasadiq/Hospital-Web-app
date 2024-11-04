const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorController');

// Get all doctors
router.get('/', doctorController.getDoctors);

// Create a new doctor (with a department reference)
router.post('/', doctorController.createDoctor);

// Update a doctor by ID
router.put('/:id', doctorController.updateDoctor); // Ensure this line is correct

// Delete a doctor by ID
router.delete('/:id', doctorController.deleteDoctor);

// Export the router
module.exports = router;
