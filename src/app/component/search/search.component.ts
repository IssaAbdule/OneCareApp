import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  ssn: string = ''; // Field to store SSN input from user
  records: any[] = []; // To hold search results
  submitted = false; // To track search submission status
  errorMessage = ''; // To display any error messages

  constructor(private customerService: CustomerService) { }

  onSearch() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.ssn.trim() === '') {
      this.errorMessage = 'SSN cannot be empty.';
      this.records = [];
      return;
    }

    // Call the customer service to check if SSN exists
    this.customerService.checkSsnExists(this.ssn).subscribe(
      (exists: boolean) => {
        if (exists) {
          // If SSN exists, proceed to search by SSN
          this.searchBySsn();
        } else {
          this.errorMessage = 'No records found for the provided SSN.';
          this.records = [];
        }
      },
      (error) => {
        this.errorMessage = 'Error occurred while checking SSN. Please try again.';
        console.error('Error checking SSN:', error);
        this.records = [];
      }
    );
  }

  searchBySsn() {
    this.customerService.searchBySsn(this.ssn).subscribe(
      (response: any) => {
        this.records = response; // Assuming the response is an array of records
        if (this.records.length === 0) {
          this.errorMessage = 'No records found for the provided SSN.';
        } else {
          this.errorMessage = '';
        }
      },
      (error) => {
        this.errorMessage = 'Error occurred while searching. Please try again.';
        console.error('Error searching for customer:', error);
        this.records = [];
      }
    );
  }

  editRecord(id: number) {
    // Logic to handle record editing
  }

  deleteRecord(id: number) {
    // Logic to handle record deletion
  }
}
