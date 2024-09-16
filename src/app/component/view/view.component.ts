import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  records: any[] = [];
  errorMessage: string = '';
  selectedRecord: any = null; // Variable to store the selected record for editing

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    const sessionToken = localStorage.getItem("token");

    if (!sessionToken) {
      alert('User not logged in.');
      return;
    } else {
      this.customerService.getRecords(sessionToken).pipe(
        map(response => response || []), // Ensure we handle empty responses
        catchError(error => {
          this.errorMessage = 'Error loading records';
          console.error('Error loading records', error);
          return []; // Return empty array on error
        })
      ).subscribe((data: any[]) => {
        this.records = data;
      });
    }
  }

  editRecord(id: number) {
    console.log("ENTER NOW");
    if (!id) {
      console.error('Record ID is undefined');
      return;
    }
    const record = this.records.find(r => r.custid === id); // Find the record by id
    if (!record) {
      console.error('Record not found');
      return;
    }

    // Store the record in selectedRecord for editing
    this.selectedRecord = { ...record }; // Clone the record to avoid directly modifying the records array
  }

  saveChanges() {
    if (!this.selectedRecord) {
      console.error('No record selected for editing');
      return;
    }

    const sessionToken = localStorage.getItem("token");

    this.customerService.editRecord(this.selectedRecord.custid, this.selectedRecord, sessionToken!).pipe(
      catchError(error => {
        this.errorMessage = 'Error editing record';
        console.error('Error editing record', error);
        return [];
      })
    ).subscribe(() => {
      console.log("INSIDE THE SUBSCRIBE");
      this.selectedRecord = null; // Clear the selectedRecord after saving
      this.loadRecords(); // Reload records after edit
    });
  }

  cancelEdit() {
    this.selectedRecord = null; // Clear the selectedRecord to hide the form
  }

  deleteRecord(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      const sessionToken = localStorage.getItem("token");

      this.customerService.deleteRecord(id, sessionToken!).pipe(
        catchError(error => {
          this.errorMessage = 'Error deleting record';
          console.error('Error deleting record', error);
          return [];
        })
      ).subscribe(() => {
        this.loadRecords(); // Reload records after deletion
      });
    }
  }
}
