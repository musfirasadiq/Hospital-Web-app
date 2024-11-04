const Department = require('../models/Department');

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department', error: error.message });
  }
};

// Add a new department
exports.addDepartment = async (req, res) => {
  const { name, description } = req.body; // Use description

  // Validate input
  if (!name) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  // Create a new department, description can be undefined
  const newDepartment = new Department({ name, description });

  try {
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding department', error: error.message });
  }
};

// Update a department
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body; // Use description

  // Validate input
  if (!name) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error: error.message });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error: error.message });
  }
};
