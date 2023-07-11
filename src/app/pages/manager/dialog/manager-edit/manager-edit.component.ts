import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManagerService } from 'src/app/services/ManagerService/manager.service'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/ProductService/product.service';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.scss']
})
export class ManagerEditComponent implements OnInit {
  managerForm: FormGroup;

  products: any[] = [];

  constructor(
    private _formbuiler: FormBuilder,
    private _productService: ProductService,
    private _managerService: ManagerService,
    private _dialogRef: MatDialogRef<ManagerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.managerForm = this._formbuiler.group({
      managerName: '',
      managerSalary: '',
      managerAge: '',
      productID: '',
    })
  }
  ngOnInit(): void {
    this.managerForm.patchValue({
      managerName: this.data.managerName,
      managerAge: this.data.managerAge,
      managerSalary: this.data.managerSalary,
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
    if (this.managerForm.valid) {
        this._managerService.UpdateManager(this.data.managerId, this.managerForm.value).subscribe({
          next: (val: any) => {
            // this._coreService.openSnackBar('Manager details updated!');
            this._dialogRef.close(true);
          },
          error: (error: any) => {
            console.error('Error updating manager details:', error);
            // Handle the error and show an error message to the user
          }
        });
    }
  }
}
