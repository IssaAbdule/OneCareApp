import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{

  reportData: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  generateReport(): void {
    // Simulate generating report
    this.reportData = 'Report generated on ' + new Date();
  }

}
