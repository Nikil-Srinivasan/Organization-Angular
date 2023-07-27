import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { teamAuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models/role';
import { TaskComponent } from './task-new/task-new.component';
import { TaskPendingComponent } from './task-pending/task-pending.component';
import { TaskOngoingComponent } from './task-ongoing/task-ongoing.component';
import { TaskCompletedComponent } from './task-completed/task-completed.component';

export const EmployeeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employees',
        component: EmployeeComponent,
        data: {
          title: 'Employee Page',
          roles: [Role.Employee, Role.Admin],
        },
        canActivate: [teamAuthGuard]
      },
      {
        path: 'tasks/new',
        component: TaskComponent,
        data: {
          title: 'Employee Task',
          roles: [Role.Employee],
        },
        canActivate: [teamAuthGuard],
      },
      {
        path: 'tasks/pending',
        component: TaskPendingComponent,
        data: {
          title: 'Pending Task',
          roles: [Role.Employee],
        },
        canActivate: [teamAuthGuard]

      },
      {
        path: 'tasks/inprogress',
        component: TaskOngoingComponent,
        data: {
          title: 'Inprogress Task',
          roles: [Role.Employee],
        },
        canActivate: [teamAuthGuard]

      },
      {
        path: 'tasks/completed',
        component: TaskCompletedComponent,
        data: {
          title: 'Completed Task',
          roles: [Role.Employee],
        },
        canActivate: [teamAuthGuard]
      }
    ]
  },
];
