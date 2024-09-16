import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service';
`q`

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  @ViewChild('resetPasswordModal', { static: false }) resetPasswordModal!: TemplateRef<any>;

  newPassword: string = '';
  confirmPassword: string = '';
  token: string | null = '';
  promptMsg: string = '';
  modalRef: NgbModalRef | null = null; // Reference to the opened modal


  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router) {}

  ngOnInit(): void {
    // Extract the token from the URL query parameters
    this.token = this.route.snapshot.queryParamMap.get('token');


  }
  ngAfterViewInit(): void {
    if (this.token && this.resetPasswordModal) {
      this.modalRef = this.modalService.open(this.resetPasswordModal, { centered: true });
    }
  }

  resetPassword() {
    console.log("INSIDE THE RESET METHOD INITIALLY");

    // Check if passwords match
    if (this.newPassword !== this.confirmPassword) {
      console.error('Passwords do not match');
      this.promptMsg = 'Passwords do not match';
      console.log(this.promptMsg);
      return;
    }

    // Check if token is available
    if (this.token) {
      this.authService.resetPassword(this.token, this.newPassword).subscribe(
        response => {
          console.log('Success:', response.message);
          this.promptMsg = "Password has been reset successfully";

          console.log(this.promptMsg);

          // Delay closing of modal to allow user to see the success message
          setTimeout(() => {
            this.modalRef?.close();
            this.router.navigate(['/login']);
          }, 3000); // Wait 3 seconds before closing the modal

        },
        error => {
          console.error('Error:', error);
          this.promptMsg = 'Error resetting password. Please try again.';
        }
      );
    } else {
      console.error('Invalid token');
      this.promptMsg = 'Invalid Token';
    }
  }

  close() {
    this.modalService.dismissAll();
  }
}
