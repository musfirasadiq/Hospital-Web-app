import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Make sure you have an AuthService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterModule]
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout(); // Call logout method from AuthService
    this.router.navigate(['/admin-login']); // Redirect to admin login page
  }
}
