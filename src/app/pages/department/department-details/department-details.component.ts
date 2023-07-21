import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  departmentId: string;
  employeelist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'designation', 'email', 'phone'];
  EmployeesAndManagerDetails : any
  IsMangerFound = false;

  constructor(private route: ActivatedRoute, private _managerService: ManagerService, private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.departmentId = params['id'];
      // Call a method to fetch product details based on the productId
      
      this._managerService.GetEmployeesAndManagerByDepartmentId(parseInt(this.departmentId)).subscribe(response =>{
        console.log(response)
        if(response.success){
          this.IsMangerFound = true
          this.EmployeesAndManagerDetails = response.data
          this.employeelist = response.data.employees;
          this.dataSource = new MatTableDataSource(this.employeelist);
          this.dataSource.paginator = this.paginator;
          this.dataObs$ = this.dataSource.connect();
        }
      })
      console.log(this.departmentId)
    });
  }
}
