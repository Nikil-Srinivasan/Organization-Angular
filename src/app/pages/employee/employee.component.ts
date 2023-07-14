import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeAddComponent } from './dialog/employee-add/employee-add.component';
import { EmployeeEditComponent } from './dialog/employee-edit/employee-edit.component';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  employeelist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'age', 'salary', 'department', 'product', 'edit', 'delete'];


  constructor(
    
    private _dialog: MatDialog,
    private _employeeService: EmployeeService,
    private _deleteDialogService: DeleteDialogService
  ) { }



  ngOnInit(): void {
    this.GetEmployees();
    throw new Error("Error loading in employee") 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetEmployees() {
    this._employeeService.GetEmployeesList().subscribe(response => {
      this.employeelist = response.data;
      this.dataSource = new MatTableDataSource(this.employeelist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  OpenAddEmployee() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "55%"
    const dialogRef = this._dialog.open(EmployeeAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetEmployees();
        }
      }
    })
  }

  OpenEditEmployee(data: any) {
    // console.log(data)
    const dialogRef = this._dialog.open(EmployeeEditComponent, {
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
    this._deleteDialogService.openConfirmDialog("Do you really want to delete this record?")
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this._employeeService.DeleteEmployee(id).subscribe({
              next: (res) => {
                // this._coreService.openSnackBar('Employee Deleted!');
                this.GetEmployees();
              },
              error: console.log,
            })
          }
        }
      });
  }
}


