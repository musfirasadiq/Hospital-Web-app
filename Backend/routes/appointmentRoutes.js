const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController');

// Routes for appointments
router.get('/', appointmentController.getAppointments);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.editAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;