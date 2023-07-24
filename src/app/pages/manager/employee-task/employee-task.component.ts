// Import required modules and services
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { ActivatedRoute } from '@angular/router';
import { TaskDescriptionComponent } from '../dialog/task-description/task-description.component';
import { TaskCreateComponent } from '../dialog/task-create/task-create.component';
import { TaskEditComponent } from '../dialog/task-edit/task-edit.component';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-employee-task',
  templateUrl: './employee-task.component.html',
  styleUrls: ['./employee-task.component.scss']
})
export class EmployeeTaskComponent implements OnInit {
  // Reference to the MatPaginator to handle pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Variables to store employee task data and manage pagination
  employeeTaskList: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['title', 'status', 'startDate', 'dueDate', 'info', 'edit', 'delete'];
  employeeId: number;
  employeeDetails: any;
  pageNumber = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    // Inject required services and components
    private _dialog: MatDialog,
    private _employeeTaskService: EmployeetaskService,
    private _activatedRoute: ActivatedRoute,
    private _employeeService: EmployeeService,
    private _deleteDialogService: DeleteDialogService,
    private _snackbar: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // Fetch the employee ID from the route parameters and load employee details and tasks
    this._activatedRoute.params.subscribe(params => {
      this.employeeId = +params['id'];
      this.GetEmployeeDetails(this.employeeId);
      this.GetAllEmployeeTask(this.employeeId);
    });
  }

  // Apply filter to the task table based on user input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Get all employee tasks and handle pagination
  GetAllEmployeeTask(id: number) {
    const pageObject = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };

    this._employeeTaskService.GetAllEmployeeTask(id, pageObject).subscribe({
      next: (response: any) => {
        if (response) {
          this.totalItems = response.data.totalNoOfRecords;
          this.totalPages = response.data.totalPages;
          this.employeeTaskList = response.data.items;
          this.dataSource = new MatTableDataSource(this.employeeTaskList);
          this.dataObs$ = this.dataSource.connect();
        }
      },
      error: (error) => {
        console.log(error.error.status);
        if (error.error.status === 401) {
          this._router.navigate(['404-page-not-found']);
        }
      }
    });
  }

  // Handle pagination change event
  onPageChange(event: PageEvent): void {
    const previousPageIndex = event.previousPageIndex !== undefined ? event.previousPageIndex : 0;
    if (event.pageIndex < previousPageIndex) {
      // Clicked on the previous arrow
      this.pageNumber--;
    } else {
      // Clicked on the next arrow
      this.pageNumber++;
    }
    this.GetAllEmployeeTask(this.employeeId);
  }

  // Get task status based on the status number
  GetStatusFromNumber(status: number) {
    return this._employeeTaskService.getStatusFromNumber(status);
  }

  // Get employee details by ID
  GetEmployeeDetails(id: number) {
    this._employeeService.GetEmployeeById(id).subscribe({
      next: (response) => {
        this.employeeDetails = response.data;
      },
      error: (error: any) => {
        console.log("Error fetching employee details: " + error);
        this._router.navigate(['404-page-not-found']);
      }
    });
  }

  // Open task description dialog
  OpenTaskDescription(taskDescription: string) {
    this._dialog.open(TaskDescriptionComponent, {
      data: {
        taskDescription
      }
    });
  }

  // Open create task dialog
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

  // Open edit task dialog
  OpenEditTask(editTaskFormData: any) {
    const dialogRef = this._dialog.open(TaskEditComponent, {
      data: {
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

  // Delete a task
  DeleteTask(id: number) {
    this._deleteDialogService.openConfirmDialog("Do you really want to delete this record?")
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this._employeeTaskService.DeleteEmployeeTask(id).subscribe({
              next: (res) => {
                this._snackbar.openSnackBar("Task Deleted Successfully!", "close");
                this.GetAllEmployeeTask(this.employeeId);
              },
              error: console.log,
            })
          }
        }
      });
  }
}
