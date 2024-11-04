import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { DepartmentService } from '../services/departments.service';
import { Doctor,Department,DoctorPayload } from '../model';


@Component({
  selector: 'app-doctors',
  standalone: true,
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [DoctorService, DepartmentService],
})
export class DoctorsComponent implements OnInit {
  doctorName: string = '';
  selectedDepartment: string = '';
  editingDoctor: Doctor | null = null;
  doctors: Doctor[] = [];
  departments: Department[] = [];
  isLoading: boolean = false;
  formError: string | null = null;
  successMessage: string | null = null;

  constructor(private doctorService: DoctorService, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.fetchDepartments(); // Fetch departments first
  }

  fetchDoctors(): void {
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe(
      (data: Doctor[]) => {
        console.log('Fetched doctors:', data); // Log the fetched doctor data
        this.doctors = data.map(doctor => ({
          ...doctor,
          department: this.getDepartmentById(doctor.department._id), // Assign department data
        }));
        this.isLoading = false;
        console.log('Doctors fetched', this.doctors);
      },
      (error: any) => this.handleError(error, 'Failed to fetch doctors.')
    );
  }

  fetchDepartments(): void {
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe(
      (data: Department[]) => {
        this.departments = data;
        this.fetchDoctors(); // Fetch doctors after departments are loaded
        this.isLoading = false;
        console.log('Departments fetched:', this.departments);
      },
      (error: any) => this.handleError(error, 'Failed to fetch departments.')
    );
  }

  getDepartmentById(departmentId: string): { _id: string; name: string } {
    return this.departments.find(dep => dep._id === departmentId) || { _id: '', name: 'Unknown' };
  }

  addOrUpdateDoctor(): void {
    this.formError = null;
    this.successMessage = null;

    if (!this.doctorName || !this.selectedDepartment) {
      this.formError = 'Please provide both a doctor name and select a department.';
      return;
    }

    const newDoctorPayload: DoctorPayload = {
      name: this.doctorName,
      departmentId: this.selectedDepartment,
    };

    console.log('Doctor Payload:', newDoctorPayload); // Log the payload

    const request = this.editingDoctor
      ? this.doctorService.updateDoctor(this.editingDoctor._id, newDoctorPayload)
      : this.doctorService.addDoctor(newDoctorPayload);

    request.subscribe(
      (response: Doctor) => this.handleSuccess(response),
      (error: any) => this.handleError(error, this.editingDoctor ? 'Failed to update doctor.' : 'Failed to add doctor.')
    );
  }

  handleSuccess(response: Doctor): void {
    if (this.editingDoctor) {
      const index = this.doctors.findIndex(d => d._id === response._id);
      if (index !== -1) {
        this.doctors[index] = response; // Update the doctor in the array
      }
      this.successMessage = 'Doctor updated successfully!';
    } else {
      this.doctors.push(response);
      this.successMessage = 'Doctor added successfully!';
    }
    this.resetForm();
    this.fetchDoctors(); // Optionally refresh the list to get the latest data
  }
  
  

  deleteDoctor(doctor: Doctor): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(doctor._id).subscribe(
        () => {
          this.doctors = this.doctors.filter(d => d._id !== doctor._id);
          this.successMessage = 'Doctor deleted successfully!';
        },
        (error: any) => this.handleError(error, 'Failed to delete doctor.')
      );
    }
  }

  resetForm(): void {
    this.doctorName = '';
    this.selectedDepartment = '';
    this.editingDoctor = null;
    this.formError = null;
    this.successMessage = null;
  }

  private handleError(error: any, message: string): void {
    console.error(message, error);
    this.formError = message;
    this.isLoading = false;
  }

  editDoctor(doctor: Doctor): void {
    this.doctorName = doctor.name;
    this.selectedDepartment = doctor.department._id;
    this.editingDoctor = doctor;
  }
}
