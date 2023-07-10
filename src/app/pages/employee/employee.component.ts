import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { AddEditComponent } from './add-edit/add-edit.component';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEmployee, EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  employeelist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'age', 'salary', 'department', 'product', 'edit', 'delete'];

  constructor(
    private _dialog: MatDialog,
    private _employeeService: EmployeeService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }
  ngOnInit(): void {
    this.GetEmployees();
  }

  GetEmployees() {
    this._employeeService.GetEmployees().subscribe(response => {
      this.employeelist = response.data;
      this.dataSource = new MatTableDataSource(this.employeelist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
      // console.log(response.data);
    });
  }

  OpenAddEditDialog(){
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.GetEmployees();
        }
      }
    })
  }

  OpenEditEmployee(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetEmployees();
        }
      }
    })
  }

  DeleteEmployee(id: number) {
    this._employeeService.DeleteEmployee(id).subscribe({
      next: (res) => {
        // this._coreService.openSnackBar('Employee Deleted!');
        this.GetEmployees();
      },
      error: console.log,
    })
  }

 

}


