import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddComponent } from './dialog/customer-add/customer-add.component';
import { CustomerEditComponent } from './dialog/customer-edit/customer-edit.component';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { DeleteDialogService } from 'src/app/services/delete-dialog.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  customerlist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['customerName', 'customerPhoneNumber', 'customerEmail', 'product', 'edit', 'delete'];

  constructor(
    private _dialog: MatDialog,
    private _customerService: CustomerService,
    private _deleteDialogService: DeleteDialogService
  ) { }

  ngOnInit(): void {
    this.GetCustomers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetCustomers() {
    this._customerService.GetCustomers().subscribe(response => {
      this.customerlist = response.data;
      this.dataSource = new MatTableDataSource(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  OpenAddCustomerDialog() {
    const dialogRef = this._dialog.open(CustomerAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetCustomers();
        }
      }
    })
  }

  OpenEditCustomer(data: any) {
    // console.log(data)
    const dialogRef = this._dialog.open(CustomerEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetCustomers();
        }
      }
    })
  }

  DeleteCustomer(id: number) {
    
    this._deleteDialogService.openConfirmDialog("Do you really want to delete this record?")
      .afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this._customerService.DeleteCustomer(id).subscribe({
              next: (res) => {
                // this._coreService.openSnackBar('Customer Deleted!');
                this.GetCustomers();
              },
              error: console.log,
            })
          }
        }
      });

  }
}
