import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DepartmentComponent } from './departments/departments.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ContactComponent } from './contact/contact.component'; 
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patient/patient.component';
import { DoctorsComponent } from './doctor/doctor.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ManageDepartmentsComponent } from './manage-department/manage-department.component'; // Correct the name here


export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'about', component: AboutComponent }, // About Us route
  { path: 'departments', component: DepartmentComponent }, // Departments page route
  { path: 'gallery', component: GalleryComponent }, // Gallery page route
  { path: 'admin-login', component: AdminLoginComponent }, // Admin login route
  { path: 'contact', component: ContactComponent }, // Contact page route
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [  // Define child routes
      { path: 'patients', component: PatientsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'appointments', component: AppointmentComponent },
      { path:'manage_department',component:ManageDepartmentsComponent },
      { path: '', redirectTo: 'patients', pathMatch: 'full' }  // Redirect to patients by default
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route for unknown paths
];
