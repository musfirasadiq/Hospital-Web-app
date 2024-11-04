const Doctor = require('../models/doctor');
const Department = require('../models/Department');

// Get all doctors with department names
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('department', 'name'); // Populate department with name only
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ success: false, error: 'Error fetching doctors' });
    }
};

// Create a new doctor
const createDoctor = async (req, res) => {
    const { name, departmentId } = req.body;

    try {
        const existingDoctor = await Doctor.findOne({ name });
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: 'Doctor already exists' });
        }

        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ success: false, message: 'Department not found' });
        }

        const newDoctor = new Doctor({ name, department: departmentId });
        const savedDoctor = await newDoctor.save();
        res.status(201).json({ success: true, data: savedDoctor });
    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({ success: false, error: 'Error adding doctor' });
    }
};

// Update a doctor's details
const updateDoctor = async (req, res) => {
    const doctorId = req.params.id;
    const updateData = req.body;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updateData, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({ success: true, data: updatedDoctor });
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(500).json({ success: false, error: 'Error updating doctor' });
    }
};


// Delete a doctor
const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id.trim();

    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
        if (!deletedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ success: false, error: 'Error deleting doctor' });
    }
};

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
};
