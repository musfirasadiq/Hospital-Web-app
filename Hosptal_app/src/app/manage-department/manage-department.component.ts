import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../services/departments.service';
import { CommonModule } from '@angular/common';

interface Department {
  _id: string; // _id is required
  name: string;
  description?: string; // description is optional
}

@Component({
  selector: 'app-manage-departments',
  standalone: true,
  templateUrl: './manage-department.component.html',
  styleUrls: ['./manage-department.component.css'],
  providers: [DepartmentService],
  imports: [FormsModule, CommonModule]
})
export class ManageDepartmentsComponent implements OnInit {
  departments: Department[] = [];
  newDepartment: Partial<Department> = {}; // Holds the department to add/edit

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (data: Department[]) => {
        console.log('Fetched departments:', data);
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  onAddOrUpdateDepartment(): void {
    const departmentData: { name: string; description?: string } = {
      name: this.newDepartment.name || '',
      description: this.newDepartment.description || ''
    };

    if (this.newDepartment._id) {
      this.departmentService.updateDepartment(this.newDepartment._id, departmentData).subscribe(
        (updatedDepartment) => {
          const index = this.departments.findIndex(d => d._id === updatedDepartment._id);
          if (index !== -1) {
            this.departments[index] = updatedDepartment;
          }
          this.resetForm();
        },
        (error) => {
          console.error('Error updating department:', error);
        }
      );
    } else {
      this.departmentService.addDepartment(departmentData).subscribe(
        (newDept: Department) => {
          this.departments.push(newDept);
          this.resetForm();
        },
        (error) => {
          console.error('Error adding department:', error);
        }
      );
    }
  }

  onEditDepartment(department: Department): void {
    this.newDepartment = { ...department };
  }

  onDeleteDepartment(department: Department): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(department._id).subscribe(
        () => {
          this.departments = this.departments.filter(d => d._id !== department._id);
        },
        (error) => {
          console.error('Error deleting department:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.newDepartment = {};
  }
}
