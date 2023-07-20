import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
// import { CustomerAddComponent } from './dialog/customer-add/customer-add.component'; 
// import { CustomerEditComponent } from './dialog/customer-edit/customer-edit.component';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';
import { CredentialsService } from 'src/app/services/auth';
import jwt_decode from 'jwt-decode';
import { Status } from 'src/app/models/status';
import { EmployeeTaskEditComponent } from '../../dialog/employee-task-edit/employee-task-edit/employee-task-edit.component';
import { EmployeeTaskDescriptionComponent } from '../../dialog/employee-task-description/employee-task-description.component';
@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.scss']
})
export class TaskCompletedComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  employeeId: number | undefined = this._credentials.userValue?.nameid;
  employeeTaskList: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['taskName','taskCreatedDate','taskDueDate','taskStatus','info'];

  constructor(private _dialog: MatDialog,
    private _employeeTaskService: EmployeetaskService,
    private _credentials: CredentialsService) {
      
     }


  ngOnInit(): void {
    this.GetEmployeeCompletedTask(this.employeeId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  GetEmployeeCompletedTask(id: number| undefined) {
    this._employeeTaskService.GetEmployeeCompletedTask(id).subscribe(response => {
      this.employeeTaskList = response.data;
      console.log(typeof(this.employeeId));
      this.dataSource = new MatTableDataSource(this.employeeTaskList);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }
  
  OpenTaskDescription(taskDescription: string) {
    this._dialog.open(EmployeeTaskDescriptionComponent , {
      data: {
        taskDescription
      }
    });
  }

  getStatusFromNumber(statusNumber: number): Status {
    switch (statusNumber) {
      case 1:
        return Status.New;
      case 2:
        return Status.InProgress;
      case 3:
        return Status.Completed;
      case 4:
        return Status.Pending;
      default:
        return Status.New; // Default value if the numeric value doesn't match any enum value
    }
  }
  
  OpenEditEmployeeTask(data: any) {
    // console.log(data)
    const dialogRef = this._dialog.open(EmployeeTaskEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetEmployeeCompletedTask(this.employeeId);
        }
      }
    })
  }
}
