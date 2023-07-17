import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMAIL_PATTERN, PASSWORD_PATTERN, USERNAME_PATTERN } from 'src/app/shared/regex-patterns';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;

  departments: any[] = [];

  managers: any[] = [];

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
    private _managerService: ManagerService,
    private _dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.employeeForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      userName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      employeeAge: ['', [Validators.required, this.ageValidator]],
      employeeSalary: ['', Validators.required],
      employeeName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      departmentID: ['', Validators.required],
      productID: 0,
      managerID: ['', Validators.required], 
      role: 2,
      managerName: '',
      managerSalary: 0,
      managerAge: 0
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

  get managerID() {
    return this.employeeForm.get('managerID');
  }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchManagers();
  }

  fetchDepartments() {
    this._departmentService.GetDepartmentsList().subscribe(departments => {
      this.departments = departments.data;
      // console.log(departments.data)
    });
  }

  fetchManagers() {
    this._managerService.GetManagersList().subscribe(managers => {
      this.managers = managers.data;
      console.log(managers.data);
    })
  }
  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this._employeeService.AddEmployee(this.employeeForm.value)
      .subscribe({
        next: (val: any) => {
          // this._coreService.openSnackBar('Employee details updated!');
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error updating employee details:', error);
          // Handle the error and show an error message to the user
        }
      }
      );
  }
}
