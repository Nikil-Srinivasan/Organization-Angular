import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartmentRoutes } from './department.routing.module';
import { DepartmentComponent } from './department.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { MaterialModule } from 'src/app/material.module';
import { DepartmentEditComponent } from './dialog/department-edit/department-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentAddComponent } from './dialog/department-add/department-add.component';

@NgModule({
  declarations: [
    DepartmentComponent,
    DepartmentDetailsComponent,
    DepartmentEditComponent,
    DepartmentAddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DepartmentRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DepartmentModule { }
