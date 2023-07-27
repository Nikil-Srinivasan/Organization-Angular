import { Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { teamAuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models/role';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeTaskComponent } from './employee-task/employee-task.component';

export const ManagerRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'managers',
        component: ManagerComponent,
        data: {
          title: 'Manager Page',
          roles: [Role.Admin],
        },
        canActivate: [teamAuthGuard]
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
        data: {
          title: 'Employee List',
          roles: [Role.Manager],
        },
        canActivate: [teamAuthGuard],
      },
      {
        path: 'employee-list/:id',
        component: EmployeeTaskComponent,
        data: {
          title: 'Employee List',
          roles: [Role.Manager],
        },
        canActivate: [teamAuthGuard],
      },
    ]
  },
];
