import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { DepartmentComponent } from './department/department.component';

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
    }
  },
  {
    path: 'product',
    component: ProductComponent,
    data: {
      title: 'Product Page',
    },
  },
  {
    path: 'customer',
    component: CustomerComponent,
    data: {
      title: 'Customer Page',
    },
  },
  {
    path: 'department',
    component: DepartmentComponent,
    data: {
      title: 'Department Page',
    },
  },
];
