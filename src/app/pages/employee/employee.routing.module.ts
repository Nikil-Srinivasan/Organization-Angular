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
        path: 'tasks/new',
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
          roles : [Role.Employee],
        },
        canActivate : [AuthGuard]

      },
      {
        path : 'tasks/inprogress',
        component : TaskOngoingComponent,
        data: {
          title: 'Inprogress Task',
          roles : [Role.Employee],
        },
        canActivate : [AuthGuard]

      },
      {
        path : 'tasks/completed',
        component : TaskPendingComponent,
        data: {
          title: 'Completed Task',
          roles : [Role.Employee],
        },
        canActivate : [AuthGuard]
      }
    ]
    },
];
