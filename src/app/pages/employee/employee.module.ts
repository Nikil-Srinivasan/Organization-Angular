import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routing.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoutes),
  ]
})
export class EmployeeModule { }
