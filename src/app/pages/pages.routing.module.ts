import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';

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
];
