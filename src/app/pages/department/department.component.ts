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
  // Reference to the MatPaginator element in the template
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Variables to hold the list of departments and the data source for the table
  departmentlist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;

  // Displayed columns for the table
  displayedColumns: string[] = ['name', 'edit'];

  constructor(
    private _dialog: MatDialog,
    private _departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    // Initialize the component by fetching the departments list
    this.getDepartmentsList();
  }

  // Function to apply filtering to the table based on user input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Function to get the list of departments from the DepartmentService
  getDepartmentsList() {
    this._departmentService.getDepartmentsList().subscribe(response => {
      this.departmentlist = response.data;
      this.dataSource = new MatTableDataSource(this.departmentlist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  // Function to open the Add Department dialog
  openAddDepartment() {
    const dialogRef = this._dialog.open(DepartmentAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        // If the dialog returns a value, refresh the departments list
        if (val) {
          this.getDepartmentsList();
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  // Function to open the Edit Department dialog
  openEditDepartment(data: any) {
    const dialogRef = this._dialog.open(DepartmentEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        // If the dialog returns a value, refresh the departments list
        if (val) {
          this.getDepartmentsList();
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}
