import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { DepartmentComponent } from './department/department.component';
import { Role } from '../models/role';
import { AuthGuard } from '../guards/auth.guard';
import { EmployeeDashboardComponent } from './dashboard/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    // component: AppDashboardComponent,
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
    path: 'manager',
    component: ManagerComponent,
    data: {
      title: 'Manager Page',
    },
    canActivate : [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./department/department.module').then(
      (m) => m.DepartmentModule
    ),
  },
];
