// Represents a patient with essential details
export interface Patient {
    _id: string;          // Unique identifier for the patient
    name: string;         // Patient's name
    age: number;          // Patient's age
    gender: string;       // Patient's gender
}

// Represents a doctor, associated with a department
export interface Doctor {
    _id: string;          // Unique identifier for the doctor
    name: string;         // Doctor's name
    department: Department; // Ensures department type consistency
}

// Represents a department with a unique ID and name
export interface Department {
    _id: string;          // Unique identifier for the department
    name: string;         // Department name
}

// Payload for creating or updating a doctor record
export interface DoctorPayload {
    name: string;         // Name of the doctor
    departmentId: string; // ID of the associated department
}

// Appointment interface with optional createdAt and updatedAt fields, as well as optional departmentId
export interface Appointment {
    _id: string;
    doctorId: { _id: string; name: string };
    patientId: { _id: string; name: string; age: number; gender: string };
    appointmentDate: string; // or Date if you're using Date objects
    appointmentTime: string;
    createdAt: string;
    updatedAt: string;
    departmentId ?: Department;
  }
  
  

// Payload for creating a new appointment, with necessary IDs and details
export interface NewAppointment {
    patientId: string;            // References Patient by ID
    doctorId: string;             // References Doctor by ID
    departmentId ?: string;         // References Department by ID
    appointmentDate: string;      // Date of appointment in ISO format or string
    appointmentTime: string;      // Time of appointment in HH:mm format
}
