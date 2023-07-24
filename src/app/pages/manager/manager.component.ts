import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { ManagerEditComponent } from './dialog/manager-edit/manager-edit.component';
import { ManagerAddComponent } from './dialog/manager-add/manager-add.component';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';
import { ManagerAppointComponent } from './dialog/manager-appoint/manager-appoint.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Empty value variable to display an empty value when necessary
  emptyValue: any = "";

  managerList: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;

  // Columns to be displayed in the table
  displayedColumns: string[] = ['name', 'age', 'salary', 'edit', 'department', 'assign', 'delete'];

  // Pagination variables
  pageNumber = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private _dialog: MatDialog,
    private _managerService: ManagerService,
    private _deleteDialogService: DeleteDialogService
  ) { }

  ngOnInit(): void {
    // Retrieve the list of managers on component initialization
    this.getManagersList();
  }

  // Function to filter the data in the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Function to get the list of managers with pagination
  getManagersList() {
    const pageObject = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };
    this._managerService.getManagersList(pageObject).subscribe(response => {
      this.managerList = response.data.items;
      this.totalItems = response.data.totalNoOfRecords;
      this.totalPages = response.data.totalPages;
      this.dataSource = new MatTableDataSource(this.managerList);
      this.dataObs$ = this.dataSource.connect();
    });
  }

  // Function to open the dialog for adding a new manager
  openAddManager() {
    const dialogRef = this._dialog.open(ManagerAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getManagersList();
        }
      }
    })
  }

  // Function to handle pagination and get the next/previous page of managers
  onPageChange(event: PageEvent): void {
    const previousPageIndex = event.previousPageIndex !== undefined ? event.previousPageIndex : 0;
    if (event.pageIndex < previousPageIndex) {
      // Clicked on the previous arrow
      this.pageNumber--;
    } else {
      // Clicked on the next arrow
      this.pageNumber++;
    }
    this.getManagersList();
  }

  // Function to open the dialog for editing a manager's details
  openEditManager(data: any) {
    const dialogRef = this._dialog.open(ManagerEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getManagersList();
        }
      }
    })
  }

  // Function to open the dialog for appointing a manager
  openAppointManager(data: any) {
    const dialogRef = this._dialog.open(ManagerAppointComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getManagersList();
        }
      }
    })
  }

  // Function to delete a manager with confirmation dialog
  deleteManager(id: number) {
    this._deleteDialogService.openConfirmDialog("Do you really want to delete this record?")
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this._managerService.deleteManager(id).subscribe({
              next: (res) => {
                this.getManagersList();
              },
              error: console.log,
            })
          }
        }
      });
  }
}
