import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { DepartmentAddComponent } from './dialog/department-add/department-add.component';
import { DepartmentEditComponent } from './dialog/department-edit/department-edit.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  departmentlist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'edit'];

  constructor(
    private _dialog: MatDialog,
    private _departmentService: DepartmentService
  ) { }
  ngOnInit(): void {
    this.GetDepartmentsList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  GetDepartmentsList() {
    this._departmentService.GetDepartmentsList().subscribe(response => {
      this.departmentlist = response.data;
      this.dataSource = new MatTableDataSource(this.departmentlist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  OpenAddDepartment(){
    const dialogRef = this._dialog.open(DepartmentAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.GetDepartmentsList();
        }
      }
    })
  }

  OpenEditDepartment(data: any) {
    const dialogRef = this._dialog.open(DepartmentEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetDepartmentsList();
        }
      }
    })
  }

  // DeleteDepartment(id: number) {
  //   this._departmentService.DeleteDepartment(id).subscribe({
  //     next: (res) => {
  //       // this._coreService.openSnackBar('Department Deleted!');
  //       this.GetDepartmentsList();
  //     },
  //     error: console.log,
  //   })
  // }
}
