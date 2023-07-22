import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Starter Page', 
    },
    canActivate : [AuthGuard]
  }, 
  {
    path: '',
    loadChildren: () => import('./employee/employee.module').then(
      (m) => m.EmployeeModule
    ),
  },
  {
    path: '',
    loadChildren: () => import('./manager/manager.module').then(
      (m) => m.ManagerModule
    ),
  },
  {
    path: '',
    loadChildren: () => import('./department/department.module').then(
      (m) => m.DepartmentModule
    ),
  },
];
