import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminUsername: string = 'admin';
  private adminPassword: string = 'password123';
  private isAuthenticated: boolean = false; // Track authentication state

  login(username: string, password: string): boolean {
    if (username === this.adminUsername && password === this.adminPassword) {
      this.isAuthenticated = true; // Set authenticated state
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false; // Reset authenticated state
    // Additional cleanup (e.g., clearing tokens or session data) can be added here
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated; // Return the authentication state
  }
}
