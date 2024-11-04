const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ensures no duplicate names
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
        index: true,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Doctor', doctorSchema);
