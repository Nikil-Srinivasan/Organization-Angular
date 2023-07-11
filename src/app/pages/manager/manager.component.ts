import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { ManagerEditComponent } from './dialog/manager-edit/manager-edit.component';
import { ManagerAddComponent } from './dialog/manager-add/manager-add.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  managerlist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'age', 'salary', 'product', 'edit', 'delete'];

  constructor(
    private _dialog: MatDialog,
    private _managerService: ManagerService
  ) { }
  ngOnInit(): void {
    this.GetManagersList();
  }

  GetManagersList() {
    this._managerService.GetManagersList().subscribe(response => {
      this.managerlist = response.data;
      this.dataSource = new MatTableDataSource(this.managerlist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  OpenAddManager(){
    const dialogRef = this._dialog.open(ManagerAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.GetManagersList();
        }
      }
    })
  }

  OpenEditManager(data: any) {
    const dialogRef = this._dialog.open(ManagerEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetManagersList();
        }
      }
    })
  }

  DeleteManager(id: number) {
    this._managerService.DeleteManager(id).subscribe({
      next: (res) => {
        // this._coreService.openSnackBar('Manager Deleted!');
        this.GetManagersList();
      },
      error: console.log,
    })
  }
}
