import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ManagerRoutes } from './manager.routing.module';
import { EmployeeTaskComponent } from './employee-task/employee-task.component';
import { TaskDescriptionComponent } from './dialog/task-description/task-description.component';
import { TaskCreateComponent } from './dialog/task-create/task-create.component';
import { TaskEditComponent } from './dialog/task-edit/task-edit.component';



@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeTaskComponent,
    TaskDescriptionComponent,
    TaskCreateComponent,
    TaskEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ManagerRoutes),
    TablerIconsModule.pick(TablerIcons),
  ]
})
export class ManagerModule { }
