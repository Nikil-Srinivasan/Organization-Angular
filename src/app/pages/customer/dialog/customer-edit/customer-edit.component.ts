import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent {
  
  customerForm: FormGroup;

  products: any[] = [];

  productMap: { [key: number]: string } = {};

  selectedProductId: number | undefined;

  constructor(
    private _formbuiler: FormBuilder,
    private _customerService: CustomerService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.customerForm = this._formbuiler.group({
      customerName: '',
      customerPhoneNumber: '',
      customerEmail: '',
      productID: ''
    })
    console.log(data)
  }
  ngOnInit(): void {
    this.customerForm.patchValue({
      customerName: this.data.customerName,
      customerPhoneNumber: this.data.customerPhoneNumber,
      customerEmail: this.data.customerEmail,
      productID: this.data.productID
    });    


    this.fetchProducts();
    
  }


  fetchProducts() {
    this._customerService.FetchProducts().subscribe(products => {
      this.products = products.data;
      this.products.forEach(product => {
        this.productMap[product.productID] = product.productName;
      });

      // Set selectedProductId to the first product
    if (!this.selectedProductId && this.products.length > 0) {
      this.selectedProductId = this.products[0].productID;
    }
    });
  }

  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.customerForm.valid) {
        this._customerService.UpdateCustomer(this.data.customerID, this.customerForm.value).subscribe({
          next: (val: any) => {
            console.log(this.data.customerID);
            console.log(this.customerForm.value);
            // this._coreService.openSnackBar('Employee details updated!');
            this._dialogRef.close(true);
          },
          error: (error: any) => {
            console.error('Error updating employee details:', error);
            // Handle the error and show an error message to the user
          }
        });
    }
  }
  
}
