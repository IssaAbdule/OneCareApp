import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
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
import { VerificationComponent } from './component/verification/verification.component';
import { ViewComponent } from './component/view/view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'verify/:token',
    component: VerificationComponent
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'view',
        component: ViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard', // Default route under 'layout'
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
