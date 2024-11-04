const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController'); // Adjust path as needed

// GET route to fetch all patients
router.get('/', patientController.getPatients);

// POST route to create a new patient
router.post('/', patientController.createPatient);

// PUT route to update an existing patient
router.put('/:id', patientController.updatePatient);


// DELETE route to delete a patient by ID
router.delete('/:id', patientController.deletePatient);


module.exports = router;
