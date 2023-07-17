import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { EMAIL_PATTERN, USERNAME_PATTERN, PHONE_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent {

  customerForm: FormGroup;
  isSubmitting: boolean = false;
  products: any[] = [];

  constructor(
    private _formbuiler: FormBuilder,
    private _customerService: CustomerService,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<CustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.customerForm = this._formbuiler.group({
      customerName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      customerEmail: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      productID: ['', Validators.required],
    })
  }

  get customerEmail() {
    return this.customerForm.get('customerEmail');
  }

  get customerName() {
    return this.customerForm.get('customerName');
  }

  get customerPhoneNumber() {
    return this.customerForm.get('customerPhoneNumber');
  }

  get productID() {
    return this.customerForm.get('productID');
  }

  ngOnInit(): void {
    this.fetchProducts();
  }


  fetchProducts() {
    this._productService.GetProductsList().subscribe(products => {
      this.products = products.data;
      console.log(products.data);
    })
  }

  //onSubmit Method is invoked when the Submit Button is clicked
  // onSubmit() {
  //   this._customerService.AddCustomer(this.customerForm.value)
  //     .subscribe({
  //       next: (val: any) => {
  //         // this._coreService.openSnackBar('Employee details updated!');
  //         this._dialogRef.close(true);
  //       },
  //       error: (error: any) => {
  //         console.error('Error ADDING employee details:', error);
  //         // Handle the error and show an error message to the user
  //       }
  //     });
  // }

  onSubmit() {
    if (this.customerForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this._customerService.AddCustomer(this.customerForm.value)
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error ADDING customer details:', error);
          // Handle the error and show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
