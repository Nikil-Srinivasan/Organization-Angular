import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CustomerAddComponent } from './dialog/customer-add/customer-add.component'; 
import { CustomerEditComponent } from './dialog/customer-edit/customer-edit.component';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';

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
  displayedColumns: string[] = ['customerName', 'customerPhoneNumber', 'customerEmail','product', 'edit', 'delete'];

  constructor(private _dialog: MatDialog,private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.GetCustomers();
  }

  GetCustomers() {
    this._customerService.GetCustomers().subscribe(response => {
      this.customerlist = response.data;
      this.dataSource = new MatTableDataSource(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  OpenAddCustomerDialog(){
    const dialogRef = this._dialog.open(CustomerAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
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
    this._customerService.DeleteCustomer(id).subscribe({
      next: (res) => {
        // this._coreService.openSnackBar('Employee Deleted!');
        this.GetCustomers();
      },
      error: console.log,
    })
  }

}
