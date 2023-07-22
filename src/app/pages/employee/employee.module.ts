import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routing.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { TaskComponent } from './task-new/task-new.component';
import { TaskPendingComponent } from './task-pending/task-pending.component';
import { TaskOngoingComponent } from './task-ongoing/task-ongoing.component';
import { EmployeeTaskEditComponent } from './dialog/employee-task-edit/employee-task-edit.component';
import { EmployeeAddComponent } from './dialog/employee-add/employee-add.component';
import { EmployeeEditComponent } from './dialog/employee-edit/employee-edit.component';
import { EmployeeComponent } from './employee.component';
import { TaskCompletedComponent } from './task-completed/task-completed.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskOngoingComponent,
    TaskPendingComponent,
    EmployeeTaskEditComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    TaskCompletedComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(EmployeeRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class EmployeeModule { }
