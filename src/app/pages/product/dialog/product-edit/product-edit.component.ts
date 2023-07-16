import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {

  productForm: FormGroup;

  constructor(
    private _formbuiler: FormBuilder,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<ProductEditComponent>,
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
    this.productForm.patchValue({
      productName: this.data.productName,
      productRevenue : this.data.productRevenue
    });
  }

  onSubmit() {
    this._productService.UpdateProduct(this.data.productID,this.productForm.value)
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error ADDING product details:', error);
          // Handle the error and show an error message to the user
        }
      });
  }
}
