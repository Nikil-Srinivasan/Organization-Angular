import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  productForm: FormGroup;

  constructor(
    private _formbuiler: FormBuilder,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<ProductAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productForm = this._formbuiler.group({
      productName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      productRevenue: ['', Validators.required]
    })
  }

  get productName() {
    return this.productForm.get('productName');
  }

  get productRevenue() {
    return this.productForm.get('productRevenue');
  }

  ngOnInit(): void {
    this.productForm.patchValue(this.data);
  }


  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this._productService.AddProduct(this.productForm.value)
      .subscribe(
        (response: any) => {
          console.log("Data sent successfully");
          this._dialogRef.close(true);
        },
        (error: any) => {
          console.log(this.productForm.value);
          console.error("Error sending data:", error);
          // Handle error if needed
        }
      );
  }
}
