import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a Department interface for better type safety
export interface Department {
  _id: string;
  name: string;
  description?: string; // Make description optional
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'http://localhost:4000/api/departments';

  constructor(private http: HttpClient) {}

  // Fetch all departments
  getDepartments(): Observable<Department[]> { // Specify return type
    return this.http.get<Department[]>(this.apiUrl);
  }

  // Add a new department
  addDepartment(department: Omit<Department, '_id'>): Observable<Department> { // Use Omit to exclude _id
    return this.http.post<Department>(this.apiUrl, department);
  }

  // Delete a department by ID
  deleteDepartment(id: string): Observable<void> { // Return type for delete
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update an existing department by ID
  updateDepartment(id: string, department: Partial<Omit<Department, '_id'>>): Observable<Department> { // Use Partial and Omit for update
    return this.http.put<Department>(`${this.apiUrl}/${id}`, department);
  }
}
