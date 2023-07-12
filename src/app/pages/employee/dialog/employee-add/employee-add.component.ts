import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EMAIL_PATTERN, PASSWORD_PATTERN, USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

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

  // Custom validator function
  ageValidator = (control: FormControl) => {
    const age = control.value;
    if (age && age <= 20) {
      return { invalidAge: true };
    }
    return null;
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _productService: ProductService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.employeeForm = this._formBuilder.group({
      email: ['', [
      Validators.required,
      Validators.pattern(EMAIL_PATTERN)
    ]
    ],
      userName: ['', [Validators.required,
      Validators.pattern(USERNAME_PATTERN) 
    ]
    ],
      password: ['', [Validators.required,
        Validators.pattern(PASSWORD_PATTERN)]
    ],
      employeeAge: ['', [Validators.required,this.ageValidator]],
      employeeSalary: ['', Validators.required],
      employeeName: ['',[ Validators.required,
      Validators.pattern(USERNAME_PATTERN)]
    ],
      departmentID: ['', Validators.required],
      productID: ['', Validators.required],
      role: [2, Validators.required],
      managerName: ['', Validators.required],
      managerSalary: [0, Validators.required],
      managerAge: [0, Validators.required]
    });
  }



  get email() {
    return this.employeeForm.get('email');
  }
  
  get userName() {
    return this.employeeForm.get('userName');
  }
  
  get password() {
    return this.employeeForm.get('password');
  }
  
  get employeeAge() {
    return this.employeeForm.get('employeeAge');
  }
  
  get employeeSalary() {
    return this.employeeForm.get('employeeSalary');
  }
  
  get employeeName() {
    return this.employeeForm.get('employeeName');
  }
  
  get departmentID() {
    return this.employeeForm.get('departmentID');
  }
  
  get productID() {
    return this.employeeForm.get('productID');
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
