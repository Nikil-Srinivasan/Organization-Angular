import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeAddComponent } from './dialog/employee-add/employee-add.component';
import { EmployeeEditComponent } from './dialog/employee-edit/employee-edit.component';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';
import { User } from 'src/app/models/user';
import { CredentialsService } from 'src/app/services/auth';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Array to store the list of employees
  employeelist: any;

  // DataSource for the MatTable to display the employees in a table
  dataSource: MatTableDataSource<any>;

  // Observable to hold the data source for the table
  dataObs$: Observable<any>;

  // Array of displayed column names for the table
  displayedColumns: string[] = ['name', 'age', 'manager', 'department', 'edit', 'delete'];

  // User object to hold the currently logged-in user information
  user: User | null;

  // Pagination properties
  pageNumber = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private credential: CredentialsService,
    private _dialog: MatDialog,
    private _employeeService: EmployeeService,
    private _deleteDialogService: DeleteDialogService
  ) {
    // Get the currently logged-in user from the credentials service
    this.user = this.credential.userValue;
  }

  ngOnInit(): void {
    // Fetch and display the initial employees list
    this.getEmployees();
  }

  // Function to apply filtering to the table based on the search input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Function to get a paginated list of employees
  getEmployees() {
    const pageObject = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };

    this._employeeService.GetEmployeesList(pageObject).subscribe(response => {
      // Store the retrieved employees in the employeelist array
      this.employeelist = response.data;

      // Update the totalItems and totalPages for pagination
      this.totalItems = response.data.totalNoOfRecords;
      this.totalPages = response.data.totalPages;

      // Create a new MatTableDataSource with the employee items and set it as the data source for the table
      this.dataSource = new MatTableDataSource(this.employeelist.items);

      // Connect the data source to the observable
      this.dataObs$ = this.dataSource.connect();
    });
  }

  // Function to handle pagination events
  onPageChange(event: PageEvent): void {
    const previousPageIndex = event.previousPageIndex !== undefined ? event.previousPageIndex : 0;

    // Determine whether the user clicked on the previous arrow or next arrow
    if (event.pageIndex < previousPageIndex) {
      // Clicked on the previous arrow, decrement the pageNumber
      this.pageNumber--;
    } else {
      // Clicked on the next arrow, increment the pageNumber
      this.pageNumber++;
    }

    // Call the getEmployees function to fetch the updated page of employees
    this.getEmployees();
  }

  // Function to open the dialog to add a new employee
  openAddEmployee() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "55%";

    // Open the EmployeeAddComponent dialog with the specified configuration
    const dialogRef = this._dialog.open(EmployeeAddComponent, dialogConfig);

    // Subscribe to the dialog close event and refresh the employees list when the dialog is closed with a valid result
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployees();
        }
      }
    });
  }

  // Function to open the dialog to edit an employee
  openEditEmployee(data: any) {
    const dialogRef = this._dialog.open(EmployeeEditComponent, {
      data,
    });

    // Subscribe to the dialog close event and refresh the employees list when the dialog is closed with a valid result
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployees();
        }
      }
    });
  }

  // Function to delete an employee
  deleteEmployee(id: number) {
    // Open the confirmation dialog using the DeleteDialogService
    this._deleteDialogService.openConfirmDialog("Do you really want to delete this record?")
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            // If the user confirmed the delete action, call the deleteEmployee function in the EmployeeService
            // and refresh the employees list on successful delete
            this._employeeService.DeleteEmployee(id).subscribe({
              next: (res) => {
                this.getEmployees();
              },
              error: console.log,
            });
          }
        }
      });
  }
}
