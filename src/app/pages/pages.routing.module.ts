import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';

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
  {
    path: 'manager',
    component: ManagerComponent,
    data: {
      title: 'Manager Page',
    },
  },
];
