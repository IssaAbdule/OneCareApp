import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttendanceChartComponent } from './component/attendance-chart/attendance-chart.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ReportsComponent } from './component/reports/reports.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { SearchComponent } from './component/search/search.component';
import { SignupComponent } from './component/signup/signup.component';
import { StaffActivityChartComponent } from './component/staff-activity-chart/staff-activity-chart.component';
import { VerificationComponent } from './component/verification/verification.component';
import { ViewComponent } from './component/view/view.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LayoutComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerificationComponent,
    RegisterComponent,
    ViewComponent,
    SearchComponent,
    DashboardComponent,
    ReportsComponent,
    ScheduleComponent,
    AttendanceChartComponent,
    StaffActivityChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule  // Add this if you're using animations
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
