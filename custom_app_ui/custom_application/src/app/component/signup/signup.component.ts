import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';

  successMsg: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.signup({firstname: this.firstname, lastname: this.lastname,
      email: this.email, password: this.password, phone: this.phone})
      .subscribe(response => {
        if(response.verificationcode != null){
          this.successMsg = "Registration successful! A verification email has been sent to your email address.";

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else if(response.status == 500) {
          this.successMsg = response.message;
        }

      }, error => {
        // console.error('Signup failed', error);
        this.successMsg = "This Email is already taken. Please sign in";
      });
  }
}
