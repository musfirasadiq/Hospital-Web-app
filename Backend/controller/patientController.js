const Patient = require('../models/patient');

// Get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new patient
const createPatient = async (req, res) => {
  const { name, age, gender } = req.body;
  try {
    const newPatient = new Patient({ name, age, gender });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing patient
const updatePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a patient
const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient
};
