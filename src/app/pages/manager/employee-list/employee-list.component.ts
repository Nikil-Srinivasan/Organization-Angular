import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { CredentialsService } from 'src/app/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  // ViewChild element from the template to interact with MatPaginator component
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Manager ID obtained from the user credentials
  managerId: any = this._credentials.userValue?.nameid;

  // List of employees managed by the current manager
  managerlist: any;

  // MatTableDataSource used to hold the data for the table
  dataSource: MatTableDataSource<any>;

  // Observable to hold data from the data source
  dataObs$: Observable<any>;

  // Array of column names to be displayed in the table
  displayedColumns: string[] = ['name', 'designation', 'action'];

  constructor(
    private _managerService: ManagerService,
    private _credentials: CredentialsService,
    private _router: Router
  ) { }

  // Lifecycle hook, called after component initialization
  ngOnInit(): void {
    // Call the function to fetch the list of employees for the current manager
    this.GetEmployeesList(this.managerId);
  }

  // Function to filter the table data based on user input in the filter field
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Function to get the list of employees for the manager with the given ID
  GetEmployeesList(id: number) {
    this._managerService.GetEmployeesByManagerId(this.managerId).subscribe(response => {
      // Store the list of employees in the managerlist variable
      this.managerlist = response.data;

      // Create a MatTableDataSource with the managerlist as the data source
      this.dataSource = new MatTableDataSource(this.managerlist);

      // Connect the MatTableDataSource to the MatPaginator for pagination
      this.dataSource.paginator = this.paginator;

      // Connect the MatTableDataSource to the dataObs$ observable
      this.dataObs$ = this.dataSource.connect();
    });
  }

  // Function to navigate to the employee details page when a row is clicked
  navigateToEmployeeDetails(employeeId: number) {
    this._router.navigate(['/dashboard/employee-list', employeeId]);
  }
}
