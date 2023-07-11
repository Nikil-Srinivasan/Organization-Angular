import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { ManagerService } from 'src/app/services/ManagerService/manager.service'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.scss']
})
export class ManagerEditComponent implements OnInit {
  managerForm: FormGroup;

  products: any[] = [];

  productMap: { [key: number]: string } = {};

  selectedProductId: number | undefined;

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeService: EmployeeService,
    private _managerService: ManagerService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<ManagerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.managerForm = this._formbuiler.group({
      managerName: '',
      managerSalary: '',
      managerAge: '',
      productID: '',
    })
    console.log(data)
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
    this._employeeService.GetProductsList().subscribe(products => {
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
    if (this.managerForm.valid) {
        this._managerService.UpdateManager(this.data.managerID, this.managerForm.value).subscribe({
          next: (val: any) => {
            console.log(this.data.managerID);
            console.log(this.managerForm.value);
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
