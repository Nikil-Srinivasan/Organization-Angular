import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    data: {
      title: 'Employee Page',
    },
  },
];
