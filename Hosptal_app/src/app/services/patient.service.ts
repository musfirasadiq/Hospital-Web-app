import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:4000/api/patients'; // Update with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all patients
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Add a new patient
  addPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, patient);
  }

  updatePatient(id: string, patient: { name: string; age: number | null; gender: string }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, patient);
  }

  // Delete a patient
  deletePatient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
