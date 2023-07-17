import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { EMAIL_PATTERN, USERNAME_PATTERN, PHONE_PATTERN } from 'src/app/shared/regex-patterns';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent {

  customerForm: FormGroup;
  isSubmitting: boolean = false;
  products: any[] = [];

  constructor(
    private _formbuiler: FormBuilder,
    private _customerService: CustomerService,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.customerForm = this._formbuiler.group({
      customerName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      customerPhoneNumber: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      customerEmail: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      productID: ['', Validators.required],
    })
    console.log(data)
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
    this.customerForm.patchValue({
      customerName: this.data.customerName,
      customerPhoneNumber: this.data.customerPhoneNumber,
      customerEmail: this.data.customerEmail,
      productID: this.data.productID
    });

    this.fetchProducts();
  }


  fetchProducts() {
    this._productService.GetProductsList().subscribe(products => {
      this.products = products.data;
    });
  }

  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.customerForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this._customerService.UpdateCustomer(this.data.customerID, this.customerForm.value)
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error updating customer details:', error);
          // Handle the error and show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

}
