import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/departments.service';
import { CommonModule } from '@angular/common';

// Define a Department interface for better type safety
interface Department {
  _id: string;
  name: string;
  description?: string; // Make description optional
}

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  imports: [CommonModule]
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  loading: boolean = true;  // Track loading state
  errorMessage: string = ''; // Track error message

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (data: Department[]) => {
        console.log('Fetched departments:', data); // Log the fetched departments
        this.departments = data;
        this.loading = false; // Stop loading once data is fetched
      },
      (error: any) => {
        console.error('Error fetching departments:', error);
        this.errorMessage = 'Failed to load departments. Please try again later.';
        this.loading = false; // Stop loading on error
      }
    );
  }
}
