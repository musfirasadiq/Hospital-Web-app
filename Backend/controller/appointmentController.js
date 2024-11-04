const Appointment = require('../models/appointment'); // Adjust the path as needed

// Fetch all appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patientId', 'name age gender') // Populate patient details
            .populate('doctorId', 'name specialty'); // Populate doctor details
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch appointments.', error: error.message });
    }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
    const { doctorId, patientId, appointmentDate, appointmentTime } = req.body;
    try {
        const newAppointment = new Appointment({ doctorId, patientId, appointmentDate, appointmentTime });
        await newAppointment.save();
        res.status(201).json({ success: true, data: newAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(400).json({ success: false, message: 'Failed to create appointment.', error: error.message });
    }
};

// Edit an existing appointment
exports.editAppointment = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found.' });
        }
        res.status(200).json({ success: true, data: updatedAppointment });
    } catch (error) {
        console.error('Error editing appointment:', error);
        res.status(400).json({ success: false, message: 'Failed to edit appointment.', error: error.message });
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found.' });
        }
        res.status(200).json({ success: true, message: 'Appointment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ success: false, message: 'Failed to delete appointment.', error: error.message });
    }
};
