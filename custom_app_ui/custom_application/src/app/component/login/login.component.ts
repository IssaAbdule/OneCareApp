import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    email: '',
    password: ''
  };

  statuses: string = '';
  successMsg: string = '';
  errorMsg: string = '';
  sessionToken: string = '';
  logoutMsg: string = '';

  constructor(private authService: AuthService, private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/layout/dashboard']);
      return;
    }

    const savedCredentials = localStorage.getItem('loginData');
    if (savedCredentials) {
      this.loginData = JSON.parse(savedCredentials);
    }
  }

  onSubmit() {
    if (!this.loginData.email.trim() || !this.loginData.password.trim()) {
      console.error('Email or password cannot be empty or whitespace');
      return;
    }
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      response => {
        if(response.status == 'SUCCESS'){
          localStorage.setItem('token', response.session);
          this.successMsg = response.message;
          setTimeout(() => {
            this.router.navigate(['/layout/dashboard']);
          }, 3000);
        } else {
          this.statuses = response.status;
          this.errorMsg = response.message;
        }
      },
      error => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }

  registerUser(){
    this.router.navigate(['/signup']);
  }

  openForgetPassword(event: Event) {
    event.preventDefault();
    this.modalService.open(ForgetPasswordComponent, { centered: true });
  }
}
