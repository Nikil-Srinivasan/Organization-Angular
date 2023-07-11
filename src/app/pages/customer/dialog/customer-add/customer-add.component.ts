import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent {

  customerForm: FormGroup;

  products: any[] = [];

  constructor(
    private _formbuiler: FormBuilder,
    private _customerService: CustomerService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<CustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.customerForm = this._formbuiler.group({
      customerName:'',
      customerPhoneNumber:'',
      customerEmail:'',
      productID:''
    })
  }
  ngOnInit(): void {
    this.customerForm.patchValue(this.data);
    this.fetchProducts();
  }

  
  fetchProducts(){
    this._http.get<any>('http://localhost:5005/api/Product/GetAllProducts').subscribe(products => {
      this.products = products.data;
      console.log(products.data);
    })
  }

  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this._customerService.AddCustomer(this.customerForm.value)
      .subscribe(
        (response: any) => {
          console.log("Data sent successfully");
          this._dialogRef.close(true);
        },
        (error: any) => {
          console.log(this.customerForm.value);
          console.error("Error sending data:", error);
          // Handle error if needed
        }
      );
  }
}
