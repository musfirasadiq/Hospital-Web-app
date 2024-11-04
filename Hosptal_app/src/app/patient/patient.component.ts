import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from '../services/patient.service';
import { Patient } from '../model';

@Component({
  selector: 'app-patients',
  standalone: true,
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [PatientService],
})
export class PatientsComponent implements OnInit {
  patientName: string = '';
  patientAge: number | null = null;
  patientGender: string = '';
  isEditing: boolean = false;
  editingPatient: Patient | null = null; // Update to use Patient interface
  patients: Patient[] = []; // Use Patient interface

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.patientService.getPatients().subscribe(
      (data: Patient[]) => {
        console.log('Fetched patients:', data); // Log the fetched patient data
        this.patients = data; // Assign the data to the patients array
      },
      (error) => {
        console.error('Error fetching patients:', error); // Log any errors that occur
      }
    );
  }

  addPatient(): void {
    const newPatient: Patient = { // Ensure newPatient adheres to Patient interface
      _id: '', // You may want to handle this differently if using a backend
      name: this.patientName,
      age: this.patientAge!,
      gender: this.patientGender,
    };

    this.patientService.addPatient(newPatient).subscribe(
      (patient: Patient) => {
        this.patients.push(patient);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding patient:', error);
      }
    );
  }

  updatePatient(): void {
    const updatedPatient: Patient = {
      _id: this.editingPatient!._id,
      name: this.patientName,
      age: this.patientAge!,
      gender: this.patientGender,
    };

    this.patientService.updatePatient(updatedPatient._id, updatedPatient).subscribe(
      (patient: Patient) => {
        const index = this.patients.findIndex(p => p._id === patient._id);
        if (index !== -1) {
          this.patients[index] = patient;
        }
        this.resetForm();
      },
      (error) => {
        console.error('Error updating patient:', error);
      }
    );
  }

  editPatient(patient: Patient): void { // Use Patient interface
    this.patientName = patient.name;
    this.patientAge = patient.age;
    this.patientGender = patient.gender;
    this.editingPatient = patient;
    this.isEditing = true;
  }

  deletePatient(patient: Patient): void { // Use Patient interface
    this.patientService.deletePatient(patient._id).subscribe(
      () => {
        this.patients = this.patients.filter(p => p._id !== patient._id);
      },
      (error) => {
        console.error('Error deleting patient:', error);
      }
    );
  }

  resetForm(): void {
    this.patientName = '';
    this.patientAge = null;
    this.patientGender = '';
    this.editingPatient = null;
    this.isEditing = false;
  }
}
