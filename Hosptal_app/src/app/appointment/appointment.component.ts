import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { Appointment, NewAppointment, Patient, Doctor } from '../model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  selectedPatientId: string = '';
  selectedDoctorId: string = '';
  appointmentDate: string = '';
  appointmentTime: string = '';
  isEditing: boolean = false;
  editingAppointmentId: string | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
    this.fetchPatients();
    this.fetchDoctors();
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (appointments: Appointment[]) => this.appointments = appointments,
      () => this.errorMessage = 'Failed to fetch appointments'
    );
  }

  fetchPatients(): void {
    this.patientService.getPatients().subscribe(
      (patients: Patient[]) => this.patients = patients,
      () => this.errorMessage = 'Failed to fetch patients'
    );
  }

  fetchDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (doctors: Doctor[]) => this.doctors = doctors,
      () => this.errorMessage = 'Failed to fetch doctors'
    );
  }

  validateTime(time: string): void {
    const timeFormat = /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    this.errorMessage = timeFormat.test(time) ? '' : 'Invalid time format. Use hh:mm AM/PM.';
  }

  bookAppointment(): void {
    const appointmentData: NewAppointment = {
      patientId: this.selectedPatientId,
      doctorId: this.selectedDoctorId,
      // departmentId is optional, so we don't include it if it's not needed
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime
    };
  
    if (this.isEditing && this.editingAppointmentId) {
      this.updateAppointment(appointmentData);
    } else {
      this.createAppointment(appointmentData);
    }
    this.resetForm();
  }
  

  createAppointment(appointmentData: Omit<NewAppointment, 'departmentId'>): void {
    this.appointmentService.createAppointment(appointmentData).subscribe(
      () => {
        this.successMessage = 'Appointment booked successfully!';
        this.fetchAppointments();
      },
      () => this.errorMessage = 'Failed to book appointment'
    );
  }

  updateAppointment(appointmentData: Omit<NewAppointment, 'departmentId'>): void {
    if (!this.editingAppointmentId) return;

    this.appointmentService.updateAppointment(this.editingAppointmentId, appointmentData).subscribe(
      () => {
        this.successMessage = 'Appointment updated successfully!';
        this.isEditing = false;
        this.fetchAppointments();
      },
      () => this.errorMessage = 'Failed to update appointment'
    );
  }

  editAppointment(appointment: Appointment): void {
    this.isEditing = true;
    this.editingAppointmentId = appointment._id;

    this.selectedPatientId = appointment.patientId._id;
    this.selectedDoctorId = appointment.doctorId._id;
    this.appointmentDate = appointment.appointmentDate;
    this.appointmentTime = appointment.appointmentTime;
  }

  deleteAppointment(id: string): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(
        () => {
          this.successMessage = 'Appointment deleted successfully!';
          this.fetchAppointments();
        },
        () => this.errorMessage = 'Failed to delete appointment'
      );
    }
  }

  resetForm(): void {
    this.selectedPatientId = '';
    this.selectedDoctorId = '';
    this.appointmentDate = '';
    this.appointmentTime = '';
    this.successMessage = '';
    this.errorMessage = '';
    this.isEditing = false;
    this.editingAppointmentId = null;
  }
}
