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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  managerId : any = this._credentials.userValue?.nameid;
  managerlist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'action'];

  constructor(
    private _managerService: ManagerService,
    private _credentials: CredentialsService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.GetEmployeesList(this.managerId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetEmployeesList(id: number) {
    this._managerService.GetEmployeesByManagerId(this.managerId).subscribe(response => {
      this.managerlist = response.data;
      this.dataSource = new MatTableDataSource(this.managerlist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }
  
  navigateToEmployeeDetails(employeeId: number) {
    this._router.navigate(['/dashboard/employee-list', employeeId]);
  }
}
