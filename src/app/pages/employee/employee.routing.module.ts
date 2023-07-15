import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models/role';
import { TaskComponent } from './task/task.component';
import { TaskPendingComponent } from './task-pending/task-pending.component';
import { TaskOngoingComponent } from './task-ongoing/task-ongoing.component';

export const EmployeeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employees',
        component: EmployeeComponent,
        data: {
          title: 'Employee Page',
          roles : [Role.Employee,Role.Admin],
        },
        canActivate : [AuthGuard]
      },
      {
        path: 'tasks',
        component: TaskComponent,
        data: {
          title: 'Employee Task',
          roles : [Role.Employee],
        },
        canActivate : [AuthGuard],
      },
      {
        path : 'tasks/pending',
        component : TaskPendingComponent,
        data: {
          title: 'Pending Task',
        },
      },
      {
        path : 'tasks/ongoing',
        component : TaskOngoingComponent,
        data: {
          title: 'Pending Task',
        },
      },
      {
        path : 'tasks/pending',
        component : TaskPendingComponent,
        data: {
          title: 'Pending Task',
        },
      }
    ]
    },
];
