import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';
import { CredentialsService } from 'src/app/services/auth';
import { EmployeeTaskEditComponent } from '../dialog/employee-task-edit/employee-task-edit.component';
import { TaskDescriptionComponent } from '../../manager/dialog/task-description/task-description.component';

@Component({
  selector: 'app-task-pending',
  templateUrl: './task-pending.component.html',
  styleUrls: ['./task-pending.component.scss']
})
export class TaskPendingComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Employee ID of the currently logged-in user
  employeeId: any = this._credentials.userValue?.nameid;

  // Array to store the list of pending tasks for the employee
  employeeTaskList: any;

  // DataSource for the MatTable to display the pending tasks in a table
  dataSource: MatTableDataSource<any>;

  // Observable to hold the data source for the table
  dataObs$: Observable<any>;

  // Array of displayed column names for the table
  displayedColumns: string[] = ['taskName', 'taskCreatedDate', 'taskDueDate', 'taskStatus', 'info', 'edit'];

  constructor(private _dialog: MatDialog,
    private _employeeTaskService: EmployeetaskService,
    private _credentials: CredentialsService) {

  }

  ngOnInit(): void {
    // Fetch and display pending tasks for the employee when the component is initialized
    this.GetEmployeePendingTask(this.employeeId);
  }

  // Function to apply filtering to the table based on the search input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Function to get pending tasks for the employee based on their ID
  GetEmployeePendingTask(id: any) {
    this._employeeTaskService.GetEmployeePendingTask(id).subscribe(response => {
      // Store the retrieved pending tasks in the employeeTaskList array
      this.employeeTaskList = response.data;

      // Create a new MatTableDataSource with the pending tasks list and set it as the data source for the table
      this.dataSource = new MatTableDataSource(this.employeeTaskList);

      // Set the paginator for the table
      this.dataSource.paginator = this.paginator;

      // Connect the data source to the observable
      this.dataObs$ = this.dataSource.connect();
    });
  }

  // Function to open a dialog to display task description when the "Info" button is clicked
  OpenTaskDescription(taskDescription: string) {
    this._dialog.open(TaskDescriptionComponent, {
      data: {
        taskDescription
      }
    });
  }

  // Function to map the numeric task status to its corresponding Status enum value
  getStatusFromNumber(status: number) {
    return this._employeeTaskService.getStatusFromNumber(status);
  }

  // Function to open the edit task dialog when the "Edit" button is clicked
  OpenEditEmployeeTask(data: any) {
    const dialogRef = this._dialog.open(EmployeeTaskEditComponent, {
      data,
    });

    // Subscribe to the dialog close event and refresh the pending tasks list when the dialog is closed with a valid result
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetEmployeePendingTask(this.employeeId);
        }
      }
    })
  }
}
