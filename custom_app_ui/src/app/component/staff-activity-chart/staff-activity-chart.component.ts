import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-staff-activity-chart',
  templateUrl: './staff-activity-chart.component.html',
  styleUrls: ['./staff-activity-chart.component.css']
})
export class StaffActivityChartComponent implements OnInit {
  chart: Chart | undefined;

  ngOnInit(): void {
    Chart.register(...registerables);

    this.chart = new Chart('staffActivityChart', {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Staff Activity',
          data: [5, 10, 7, 12],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
