import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee/dialog/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee/dialog/employee-edit/employee-edit.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerAddComponent } from './manager/dialog/manager-add/manager-add.component';
import { ManagerEditComponent } from './manager/dialog/manager-edit/manager-edit.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentAddComponent } from './department/dialog/department-add/department-add.component';
import { DepartmentEditComponent } from './department/dialog/department-edit/department-edit.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { EmployeeDashboardComponent } from './dashboard/employee-dashboard/employee-dashboard.component';
import { ManagerAppointComponent } from './manager/dialog/manager-appoint/manager-appoint.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    ManagerDashboardComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    ManagerComponent,
    ManagerAddComponent,
    ManagerEditComponent,
    DepartmentAddComponent,
    DepartmentEditComponent,
    ConfirmDeleteComponent,
    ManagerAppointComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    
  ],
  exports: [TablerIconsModule],
  
})
export class PagesModule {}
