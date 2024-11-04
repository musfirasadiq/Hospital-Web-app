const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
        index: true // Index for faster querying
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
        index: true // Index for faster querying
    },
    appointmentDate: {
        type: Date, // Store the date as a Date type
        required: true,
        validate: {
            validator: function(v) {
                return v >= new Date(); // Ensure the date is not in the past
            },
            message: props => `Appointment date ${props.value} cannot be in the past!`
        }
    },
    appointmentTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(0[1-9]|1[0-2]):([0-5]\d) [APap][mM]$/.test(v); // Matches 12-hour format with AM/PM
            },
            message: props => `${props.value} is not a valid time format! Please use hh:mm AM/PM.`
        }
    }
}, { timestamps: true });

// Compound index for uniqueness
appointmentSchema.index({ doctorId: 1, patientId: 1, appointmentDate: 1, appointmentTime: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
