import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiUrl = 'http://localhost:8080/api/records'; // Adjust URL as needed

  constructor(private http: HttpClient) {}

  getRecords() {
    return;
    // this.http.get<any[]>(this.apiUrl);
  }

  searchRecords() {
    return;
    // return this.http.get<any[]>(`${this.apiUrl}?search=${query}`);
  }
}
