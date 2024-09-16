import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/api/customers'; // Adjust the API URL as needed

  constructor(private http: HttpClient) {}

  // Method to send registration data to the backend
  registerCustomer(customerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, customerData);
  }
}
