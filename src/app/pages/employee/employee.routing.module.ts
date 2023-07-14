import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models/role';

export const EmployeeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmployeeComponent,
        data: {
          title: 'Employee Page',
          roles : [Role.Employee],
        },
        canActivate : [AuthGuard]
      },
    ]
    },
];
