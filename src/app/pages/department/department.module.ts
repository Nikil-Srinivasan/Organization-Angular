import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartmentRoutes } from './department.routing.module';
import { DepartmentComponent } from './department.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    DepartmentDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DepartmentRoutes),
    MaterialModule
  ]
})
export class DepartmentModule { }
