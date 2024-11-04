import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Import AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  imports: [FormsModule, CommonModule]  // Ensure FormsModule is imported for ngModel
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      this.router.navigate(['/dashboard']);  // Redirect to dashboard on successful login
    } else {
      this.errorMessage = 'Invalid username or password';  // Set error message
    }
  }
}
