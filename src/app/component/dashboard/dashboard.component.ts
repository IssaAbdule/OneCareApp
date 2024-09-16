import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  metrics = {
    totalChildren: 0,
    totalStaff: 0,
    dailyActivities: 0,
    upcomingEvents: []
  };

  ngOnInit(): void {
    // Mock data for demonstration purposes
    this.metrics = {
      totalChildren: 45,
      totalStaff: 12,
      dailyActivities: 6,
      upcomingEvents: [
        { date: '2024-09-05', event: 'Parent-Teacher Meeting' },
        { date: '2024-09-12', event: 'Field Trip' },
        { date: '2024-09-20', event: 'Sports Day' }
      ]
    };
  }
}
