import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { ActivatedRoute } from '@angular/router';
import { TaskDescriptionComponent } from '../dialog/task-description/task-description.component';
import { TaskCreateComponent } from '../dialog/task-create/task-create.component';
import { TaskEditComponent } from '../dialog/task-edit/task-edit.component';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-task',
  templateUrl: './employee-task.component.html',
  styleUrls: ['./employee-task.component.scss']
})
export class EmployeeTaskComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  employeeTaskList: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['title', 'status', 'startDate', 'dueDate', 'info', 'edit', 'delete'];
  employeeId: number;
  employeeDetails: any;

  constructor(
    private _dialog: MatDialog,
    private _employeeTaskService: EmployeetaskService,
    private _route: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _deleteDialogService: DeleteDialogService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.employeeId = +params['id'];
      this.GetAllEmployeeTask(this.employeeId);
      this.GetEmployeeDetails(this.employeeId);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetAllEmployeeTask(id: number) {
    this._employeeTaskService.GetAllEmployeeTask(id).subscribe(response => {
      this.employeeTaskList = response.data;
      this.dataSource = new MatTableDataSource(this.employeeTaskList);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  GetStatusFromNumber(status: number) {
    return this._employeeTaskService.getStatusFromNumber(status)
  }

  GetEmployeeDetails(id: number) {
    this._employeeService.GetEmployeeById(id).subscribe(response => {
      this.employeeDetails = response.data;
    });
  }

  OpenTaskDescription(taskDescription: string) {
    this._dialog.open(TaskDescriptionComponent, {
      data: {
        taskDescription
      }
    });
  }

  OpenCreateTask() {
    const dialogRef = this._dialog.open(TaskCreateComponent, {
      data: {
        employeeId: this.employeeId,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllEmployeeTask(this.employeeId);
        }
      },
      error: (error: any) => {
        console.error('Error ADDING Task details:', error);
        // Handle the error and show an error message to the user
      },
    })
  }

  OpenEditTask(editTaskFormData: any) {
    // console.log("Form Datafor checking:" + formData )
  
    const dialogRef = this._dialog.open(TaskEditComponent, {
      data:{
        editTaskFormData,
        employeeId: this.employeeId,
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllEmployeeTask(this.employeeId);
        }
      },
      error: (error: any) => {
        console.error('Error Updating Task details:', error);
        // Handle the error and show an error message to the user
      },
    })
  }

  
  DeleteTask(id: number) {
    this._deleteDialogService.openConfirmDialog("Do you really want to delete this record?")
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this._employeeTaskService.DeleteEmployeeTask(id).subscribe({
              next: (res) => {
                this._snackBar.open("Task Deleted Successfully!", "close");
                this.GetAllEmployeeTask(this.employeeId);
              },
              error: console.log,
            })
          }
        }
      });
  }
}
