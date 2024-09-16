import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8080/api/customers'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getRecords(sessionToken:string ): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': sessionToken
    });
    const url = `${this.baseUrl}/all`;
    return this.http.get<any[]>(url, {headers});
  }
  // getRecords() {
  //   return;
  // }

  // deleteRecord(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }


  registerCustomers(customer: any, sessionToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': sessionToken,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/register`, customer, { headers });
  }

  checkSsnExists(ssn: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-ssn/${ssn}`);
  }

   // Method to search customer by SSN
   searchBySsn(ssn: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search?ssn=${ssn}`);
  }

  editRecord(id: number, updatedRecord: any, sessionToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionToken}`);
    return this.http.put<any>(`${this.baseUrl}/${id}`, updatedRecord, { headers });
  }

  deleteRecord(id: number, sessionToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${sessionToken}`);
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }
}

