import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  verificationMessage: string = 'Verifying...';
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract the token from the URL
    this.token = this.route.snapshot.paramMap.get('token');

    if (this.token) {
      this.authService.verifyUser(this.token).subscribe(
        response => {
          if (response.status === 'SUCCESS') {
            this.verificationMessage = 'User or Email is verified!';
            // Redirect to login page after 3 seconds
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          } else {
            this.verificationMessage = response.message || 'Verification failed!';
          }
        },
        error => {
          this.verificationMessage = 'An error occurred during verification.';
          console.error('Error:', error);
        }
      );
    } else {
      this.verificationMessage = 'Invalid verification token.';
    }
  }
}
