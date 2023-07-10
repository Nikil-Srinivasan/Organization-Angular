import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

interface IDepartment {
  id: number;
  departmentName: string;
}

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;

  departments: any[] = [];

  departmentMap: { [key: number]: string } = {};

  selectedDepartmentId: number | undefined;

  products: any[] = [];

  productMap: { [key: number]: string } = {};

  selectedProductId: number | undefined;

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeService: EmployeeService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.employeeForm = this._formbuiler.group({
      employeeName: '',
      employeeSalary: '',
      employeeAge: '',
      departmentID: '',
      productID: '',
    })
    console.log(data)
  }
  ngOnInit(): void {
    this.employeeForm.patchValue({
      employeeName: this.data.employeeName,
      employeeAge: this.data.employeeAge,
      employeeSalary: this.data.employeeSalary,
      departmentID: this.data.departmentID,
      productID: this.data.productID
    });    

    this.fetchDepartments();
    this.fetchProducts();
    
  }

  fetchDepartments() {
    this._employeeService.FetchDepartments().subscribe(departments => {
      this.departments = departments.data;
      this.departments.forEach(department => {
        this.departmentMap[department.departmentID] = department.departmentName;
      });

      if (!this.selectedDepartmentId && this.departments.length > 0) {
        this.selectedDepartmentId = this.departments[0].departmentID;
      }
    });

  }

  fetchProducts() {
    this._employeeService.FetchProducts().subscribe(products => {
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
    if (this.employeeForm.valid) {
        this._employeeService.UpdateEmployee(this.data.employeeID, this.employeeForm.value).subscribe({
          next: (val: any) => {
            console.log(this.data.employeeID);
            console.log(this.employeeForm.value);
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
