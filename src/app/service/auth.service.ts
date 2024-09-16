import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private baseUrl = 'http://localhost:8080/api'; // Your Spring Boot backend URL
  private logoutBaseUrl = 'http://localhost:8080/api';
  private displayMsg: string = '';




  constructor(private http: HttpClient, private router: Router) { }

  private token: string = '';

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/userlogin`, { email, password }, { headers });
  }

  signup(user: { firstname: string, lastname: string, email: string, password: string, phone: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }



  logout(token: string): Observable<any> {

    // localStorage.removeItem('authToken');
    return this.http.delete(`${this.baseUrl}/userlogout/${token}`)
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


  // isLoggedIn(): boolean {
  //   return !!this.getToken(); // Check if the token exists
  // }

  sendResetLink(email: string): Observable<any> {
    console.log("INSIDE THE SENDRESETLINK IN AUTHSERVICE");
    const payload = { email: email };  // Create an object with the email field
    return this.http.post(`${this.baseUrl}/auth/reset-password-request`, payload, {
      headers: {
          'Content-Type': 'application/json'}});
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/auth/reset-password?token=${token}`;
    const payload = {newPassword: newPassword}
    return this.http.post(url, payload, {
      headers: {
        'Content-Type': 'text/plain'  // Set content type to plain text
      },
      responseType: 'text' // Expect a plain text response
    });
  }

  verifyUser(token: string): Observable<any> {
    const url = `${this.baseUrl}/verify/${token}`;
    return this.http.get<any>(url);
  }


}
