import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      ssn: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  onRegister() {
    this.submitted = true;

    const sessionToken = localStorage.getItem('token');

    if (!sessionToken) {
      alert('User not logged in.');
      return;
    }

    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      // Format the dob field to MM/dd/yyyy before sending to the backend
      // const formattedDate = new Date(user.dob).toLocaleDateString('en-US', {
      //   month: '2-digit', day: '2-digit', year: 'numeric'
      // });
      // user.dob = formattedDate;

      // Check if SSN already exists
      this.customerService.checkSsnExists(user.ssn).subscribe(
        (exists: boolean) => {
          if (exists) {
            this.errorMessage = 'SSN already exists. Please provide a unique SSN.';
            this.successMessage = '';
          } else {
            // Proceed with registration
            this.customerService.registerCustomers(user, sessionToken).subscribe(
              (response) => {
                this.successMessage = 'Customer Registration Successful!';
                this.errorMessage = '';
                setTimeout(() => {
                  this.router.navigate(['/layout/dashboard']);
                }, 3000);


              },
              (error) => {
                this.errorMessage = 'Registration failed. Please try again.';
                this.successMessage = '';
                console.error('Error registering customer:', error);
              }
            );
          }
        },
        (error) => {
          this.errorMessage = 'Error checking SSN uniqueness. Please try again.';
          this.successMessage = '';
          console.error('Error checking SSN:', error);
        }
      );
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
      this.successMessage = '';
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
}
