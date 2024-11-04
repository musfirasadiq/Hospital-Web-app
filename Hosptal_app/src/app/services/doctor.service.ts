import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface DoctorPayload {
  name: string;
  departmentId: string;
}

interface Doctor {
  _id: string;
  name: string;
  department: {
    _id: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:4000/api/doctors';

  constructor(private http: HttpClient) {}

  // Fetch all doctors
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<{ success: boolean; data: Doctor[] }>(this.apiUrl).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('Failed to fetch doctors.');
        }
        return response.data.map(doctor => ({
          ...doctor,
          department: doctor.department || { _id: '', name: 'Unknown' }, // Fallback for missing department
        }));
      }),
      catchError(this.handleError) // Handle any errors that may occur
    );
  }

  // Add a new doctor
  addDoctor(newDoctor: DoctorPayload): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, newDoctor).pipe(
      catchError(this.handleError) // Handle any errors that may occur
    );
  }

  // Delete a doctor by ID
  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Handle any errors that may occur
    );
  }

  // Update an existing doctor by ID
  updateDoctor(doctorId: string, updatedDoctor: DoctorPayload): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${doctorId}`, updatedDoctor).pipe(
      catchError(this.handleError) // Handle any errors that may occur
    );
  }

  // Generic error handling method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log the error to the console
    const errorMessage = error.error?.message || 'Something went wrong; please try again later.';
    return throwError(() => new Error(errorMessage));
  }
}
