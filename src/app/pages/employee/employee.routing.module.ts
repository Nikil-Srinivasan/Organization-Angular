import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models/role';
import { TaskComponent } from './task-new/task-new.component';
import { TaskPendingComponent } from './task-pending/task-pending.component';
import { TaskOngoingComponent } from './task-ongoing/task-ongoing.component';
import { TaskCompletedComponent } from './task-completed/task-completed/task-completed.component';
import { EmployeeDashboardComponent } from '../dashboard/employee-dashboard/employee-dashboard.component';

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
        },
        canActivate : [AuthGuard]

      },
      {
        path : 'tasks/inprogress',
        component : TaskOngoingComponent,
        data: {
          title: 'Inprogress Task',
        },
        canActivate : [AuthGuard]

      },
      {
        path : 'tasks/completed',
        component : TaskCompletedComponent,
        data: {
          title: 'Completed Task',
        },
        canActivate : [AuthGuard]
      }
    ]
    },
];
