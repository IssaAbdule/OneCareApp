import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  email: string = '';
  successMessage: string = ''; // Variable to store the success message
  errorMessage: string = ''; // Variable to store the error message

  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    private router: Router
  ) {}

  close() {
    this.activeModal.dismiss('Cancel click');
  }

  sendResetLink() {
    console.log("FIRST DOOR OF RESET LINK");
    this.authService.sendResetLink(this.email).subscribe(
      response => {
        console.log("RESPONSE " +  response.message);
        if (response.message == 'Reset password email sent') {
          console.log('Success:', response);

          // Display the success message
          this.successMessage = response.message;

          console.log("MESSAGE HERE " + this.successMessage)

          // Delay the closing of the modal to allow the user to see the message
          setTimeout(() => {
            this.activeModal.close();
            // Route to the login page after closing the modal
            this.router.navigate(['/login']);
          }, 3000); // Wait for 3 seconds
        }
      },
      error => {
        // Handle the error response here
        console.error('Error:', error);
        this.errorMessage = 'Failed to send reset link. Please try again later.';
      }
    );
  }
}
