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
import { EmployeeTaskEditComponent } from '../dialog/employee-task-edit/employee-task-edit/employee-task-edit.component';


@Component({
  selector: 'app-task',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.scss']
})
export class TaskComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  employeeId: number | undefined = this._credentials.userValue?.nameid;
  employeeTaskList: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['taskName', 'taskDescription', 'taskDueDate','taskStatus', 'edit'];

  constructor(private _dialog: MatDialog,
    private _employeeTaskService: EmployeetaskService,
    private _credentials: CredentialsService) {
      
     }


  ngOnInit(): void {
    this.GetEmployeeNewTask(this.employeeId);
    this._employeeTaskService.getTaskCount().subscribe(val =>{console.log(val)});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  GetEmployeeNewTask(id: number| undefined) {
    this._employeeTaskService.GetEmployeeNewTask(id).subscribe(response => {
      this.employeeTaskList = response.data;
      console.log(typeof(this.employeeId));
      this.dataSource = new MatTableDataSource(this.employeeTaskList);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
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
          this.GetEmployeeNewTask(this.employeeId);
        }
      }
    })
  }
  // OpenAddCustomerDialog(){
  //   const dialogRef = this._dialog.open(CustomerAddComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if(val){
  //         this.GetCustomers();
  //       }
  //     }
  //   })
  // }

  // OpenEditCustomer(data: any) {
  //   // console.log(data)
  //   const dialogRef = this._dialog.open(CustomerEditComponent, {
  //     data,
  //   });
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.GetCustomers();
  //       }
  //     }
  //   })
  // }

  // DeleteCustomer(id: number) {
  //   this._customerService.DeleteCustomer(id).subscribe({
  //     next: (res) => {
  //       // this._coreService.openSnackBar('Employee Deleted!');
  //       this.GetCustomers();
  //     },
  //     error: console.log,
  //   })
  // }
}
