import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;

  departments: any[] = [];

  products: any[] = [];

  selectedDepartmentId: number | undefined;

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _productService: ProductService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.employeeForm = this._formbuiler.group({
      email:'',
      userName: '',
      password:'',
      employeeAge: '',
      employeeSalary: '',
      employeeName:'',
      departmentID: '',
      productID: '',
      role:2,
      managerName:'',
      managerSalary:0,
      managerAge:0
    })
  }
  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
    this.fetchDepartments();
    this.fetchProducts();
  }

  fetchDepartments() {
    this._departmentService.GetDepartmentsList().subscribe(departments => {
      this.departments = departments.data;
      console.log(departments.data)
    });
  }

  fetchProducts(){
    this._productService.GetProductsList().subscribe(products => {
      this.products = products.data;
      console.log(products.data);
    })
  }
  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this._employeeService.AddEmployee(this.employeeForm.value)
      .subscribe(
        (response: any) => {
          console.log("Data sent successfully");
          this._dialogRef.close(true);
        },
        (error: any) => {
          console.log(this.employeeForm.value);
          console.error("Error sending data:", error);
          // Handle error if needed
        }
      );
  }
}
