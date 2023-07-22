import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMAIL_PATTERN, NAME_PATTERN, PASSWORD_PATTERN, PHONE_PATTERN, USERNAME_PATTERN } from 'src/app/shared/regex-patterns';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _managerService: ManagerService,
    private _dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    // Initialize the employee form with form controls and validators
    this.employeeForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      userName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      employeeAge: ['', [Validators.required, this.ageValidator]],
      employeeSalary: ['', Validators.required],
      employeeName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      managerID: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      role: 2,
      managerName: '',
      managerSalary: 0,
      managerAge: 0
    });
  }

  // Helper getter methods for accessing individual form controls

  get designation() {
    return this.employeeForm.get('designation');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get phone() {
    return this.employeeForm.get('phone');
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

  get managerID() {
    return this.employeeForm.get('managerID');
  }

  ngOnInit(): void {
    // Fetch departments associated with managers when the component is initialized
    this.fetchDepartmentsAssociatedWithManager();
  }

  fetchDepartmentsAssociatedWithManager() {
    // Fetch departments associated with managers using the ManagerService
    this._managerService.GetAllDepartmentsAssociatedWithManager().subscribe(departments => {
      this.departments = departments.data;
    });
  }

  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    // Call the EmployeeService to add a new employee
    this._employeeService.AddEmployee(this.employeeForm.value).subscribe({
      next: (val: any) => {
        this._dialogRef.close(true); // Close the dialog on successful employee addition
        this._snackBar.open("Employee added successfully", 'Close', {
          duration: 3000
        });
      },
      error: (error: any) => {
        console.error('Error updating employee details:', error);
        // Handle the error and show an error message to the user "Email already exists"
        if (error.error?.message === "Email already exists") {
          // Perform custom validation for email already exists
          this.employeeForm.get('email')?.setErrors({ emailAlreadyExist: true });
        }
      }
    });
  }
}
