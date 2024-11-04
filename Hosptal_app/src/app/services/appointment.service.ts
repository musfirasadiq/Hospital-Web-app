import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Appointment, NewAppointment } from '../model'; // Import your appointment model
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:4000/api/appointments';

  constructor(private http: HttpClient) {}

  // Fetch all appointments
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<{ success: boolean; data: Appointment[] }>(this.apiUrl).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('Failed to fetch appointments.');
        }
        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  // Create a new appointment
  createAppointment(newAppointment: NewAppointment): Observable<Appointment> {
    return this.http.post<{ success: boolean; data: Appointment }>(this.apiUrl, newAppointment).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('Failed to create appointment.');
        }
        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  // Update an existing appointment by ID
  updateAppointment(appointmentId: string, updatedAppointment: NewAppointment): Observable<Appointment> {
    return this.http.put<{ success: boolean; data: Appointment }>(`${this.apiUrl}/${appointmentId}`, updatedAppointment).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('Failed to update appointment.');
        }
        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  // Delete an appointment by ID
  deleteAppointment(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        if (!response.success) {
          throw new Error('Failed to delete appointment.');
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Generic error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'Something went wrong; please try again later.';
    return throwError(() => new Error(errorMessage));
  }
}
