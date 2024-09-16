import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-chart',
  templateUrl: './attendance-chart.component.html',
  styleUrls: ['./attendance-chart.component.css']
})
export class AttendanceChartComponent {
  chartType = 'bar';
  chartLabels = ['January', 'February', 'March', 'April', 'May'];
  chartData = [
    { data: [30, 45, 50, 40, 60], label: 'Children Attendance' }
  ];
  chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };
}
