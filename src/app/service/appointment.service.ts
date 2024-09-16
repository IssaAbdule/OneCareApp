import { Injectable } from '@angular/core';

interface Appointment {
  date: string;
  clientName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: Appointment[] = [
    { date: '2024-08-30', clientName: 'John Doe' },
    { date: '2024-09-01', clientName: 'Jane Smith' }
  ];

  constructor() { }

  getAppointments(): Appointment[] {
    // Simulate fetching appointments from a backend or database
    return this.appointments;
  }

  addAppointment(appointment: Appointment): void {
    // Logic to add a new appointment
    this.appointments.push(appointment);
  }

  // You can add more methods to update or delete appointments as needed
}
