import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] // Corrected typo to `styleUrls`
})
export class LayoutComponent implements OnInit {
  logoutMsg: string = '';
  showWelcomeText: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Listen for route changes
    // Redirect to dashboard if the current route is the base '/layout'
    if (this.router.url === '/layout') {
      this.router.navigate(['/layout/dashboard']);
    }
  }

  onLogout() {
    // Logout logic remains the same
    const sessionToken = this.authService.getToken();
    if (sessionToken) {
      this.authService.logout(sessionToken).subscribe(
        response => {
          if (response.status === 'SUCCESS') {
            this.logoutMsg = 'Logging Out... You are being logged out. Please wait while we redirect you.';
            console.log(this.logoutMsg);

            localStorage.removeItem('token');
            setTimeout(() => {
              this.logoutMsg = '';
              this.router.navigate(['/login']);
            }, 5000);
          } else {
            this.logoutMsg = response.message;
            console.log(this.logoutMsg);
            setTimeout(() => {
              this.logoutMsg = '';
            }, 5000);
          }
        },
        error => {
          console.error('Logout failed', error);
          alert('Logout failed. Please try again.');
        }
      );
    } else {
      console.error('No session token found');
      alert('No session token found. Please log in again.');
      this.router.navigate(['/login']);
    }

    localStorage.clear();
  }

  // Navigation methods remain the same
  registerRecord() {
    this.router.navigate(['/layout/register']);
  }

  viewRecords() {
    this.router.navigate(['/layout/view']);
  }

  searchRecords() {
    this.router.navigate(['/layout/search']);
  }

  viewDashboard() {
    this.router.navigate(['/layout/dashboard']);
  }

  manageSchedule() {
    this.router.navigate(['/layout/schedule']);
  }

  viewReports() {
    this.router.navigate(['/layout/reports']);
  }
}
