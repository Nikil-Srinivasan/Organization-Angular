import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

interface IDepartment {
  id: number;
  departmentName: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {

  employeeForm: FormGroup;

  departments: any[] = [];

  products: any[] = [];

  selectedDepartmentId: number | undefined;

  roles: string[] = [
    'Developer',
    'HR',
    'Sales',
    'Marketing'
  ]

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeService: EmployeeService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<AddEditComponent>,
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
    this._http.get<any>('http://localhost:5005/api/Department/GetAllDepartment').subscribe(departments => {
      this.departments = departments.data;
      console.log(departments.data)
    });
  }

  fetchProducts(){
    this._http.get<any>('http://localhost:5005/api/Product/GetAllProducts').subscribe(products => {
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


