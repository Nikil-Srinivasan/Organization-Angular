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
  selector: 'app-task-ongoing',
  templateUrl: './task-ongoing.component.html',
  styleUrls: ['./task-ongoing.component.scss']
})
export class TaskOngoingComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Variable to store the employee ID (retrieved from user authentication data)
  employeeId: any = this._credentials.userValue?.nameid;

  // Variable to store the ongoing task list of the employee
  employeeTaskList: any;

  // DataSource to be used for the MatTable displaying the ongoing tasks
  dataSource: MatTableDataSource<any>;

  // Observable to observe changes in the data source
  dataObs$: Observable<any>;

  // Columns to be displayed in the table
  displayedColumns: string[] = ['taskName', 'taskCreatedDate', 'taskDueDate', 'taskStatus', 'info', 'edit'];

  constructor(private _dialog: MatDialog,
    private _employeeTaskService: EmployeetaskService,
    private _credentials: CredentialsService) {

  }

  // Lifecycle hook that runs after the component is initialized
  ngOnInit(): void {
    this.getEmployeeInProgressTask(this.employeeId);
  }

  // Method to apply filter to the table data based on user input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Method to get the ongoing tasks of the employee from the server
  getEmployeeInProgressTask(id: any) {
    this._employeeTaskService.getEmployeeInProgressTask(id).subscribe(response => {
      this.employeeTaskList = response.data;
      // Create a new MatTableDataSource with the retrieved data and connect it to the paginator
      this.dataSource = new MatTableDataSource(this.employeeTaskList);
      this.dataSource.paginator = this.paginator;
      // Connect the data source to the Observable to observe changes in the table data
      this.dataObs$ = this.dataSource.connect();
    });
  }

  // Method to open a dialog showing the description of a task
  openTaskDescription(taskDescription: string) {
    this._dialog.open(TaskDescriptionComponent, {
      data: {
        taskDescription
      }
    });
  }

  // Method to map numeric status values to corresponding Status enum values
  getStatusFromNumber(status: number) {
    return this._employeeTaskService.getStatusFromNumber(status);
  }

  // Method to open a dialog for editing an ongoing task
  openEditEmployeeTask(data: any) {
    const dialogRef = this._dialog.open(EmployeeTaskEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // Refresh the ongoing task list after editing a task
          this.getEmployeeInProgressTask(this.employeeId);
        }
      }
    })
  }
}
