import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html'
})
export class DepartmentDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  departmentId: string;
  employeelist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'designation', 'email', 'phone'];
  EmployeesAndManagerDetails: any
  IsMangerFound = false;

  constructor(private route: ActivatedRoute, private _managerService: ManagerService, private _employeeService: EmployeeService) { }

  ngOnInit() {
    // Subscribe to route parameters to get the departmentId from the URL
    this.route.params.subscribe(params => {
      this.departmentId = params['id'];

      // Call a method to fetch product details based on the departmentId
      this._managerService.GetEmployeesAndManagerByDepartmentId(parseInt(this.departmentId)).subscribe(response => {
        if (response.success) {
          this.IsMangerFound = true;
          this.EmployeesAndManagerDetails = response.data;
          this.employeelist = response.data.employees;

          // Create a MatTableDataSource with the employee list
          this.dataSource = new MatTableDataSource(this.employeelist);

          // Set the MatPaginator for the table
          this.dataSource.paginator = this.paginator;

          // Connect the data source to an observable for tracking changes
          this.dataObs$ = this.dataSource.connect();
        }
      });
    });
  }
}
