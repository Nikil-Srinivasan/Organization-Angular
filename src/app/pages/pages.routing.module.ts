import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { DepartmentComponent } from './department/department.component';
import { Role } from '../models/role';
import { AuthGuard } from '../guards/auth.guard';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
    canActivate : [AuthGuard]
  },
  {
    path: 'employees',
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
    path: 'product',
    component: ProductComponent,
    data: {
      title: 'Product Page',
    },
    canActivate : [AuthGuard]
  },
  {
    path: 'customer',
    component: CustomerComponent,
    data: {
      title: 'Customer Page',
    },
    canActivate : [AuthGuard]
  },
  {
    path: 'department',
    component: DepartmentComponent,
    data: {
      title: 'Department Page',
    },
    canActivate : [AuthGuard]
  },
];
