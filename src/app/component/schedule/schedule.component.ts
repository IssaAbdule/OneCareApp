import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';

interface Appointment {
  date: string;
  clientName: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    // Fetch initial schedule data from the service
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    // Get appointments from the service
    this.appointments = this.appointmentService.getAppointments();
  }

  addAppointment(): void {
    // Logic to add a new appointment
    const newAppointment: Appointment = { date: '2024-09-02', clientName: 'New Client' };
    this.appointmentService.addAppointment(newAppointment);
    // Refresh the appointments list
    this.fetchAppointments();
  }
}
