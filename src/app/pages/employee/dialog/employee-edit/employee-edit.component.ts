import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NAME_PATTERN, PHONE_PATTERN } from 'src/app/shared/regex-patterns';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  selectedDepartment: any;
  departments: any[] = [];

  // Custom validator function for age field
  ageValidator = (control: FormControl) => {
    const age = control.value;
    if (age && age <= 20) {
      return { invalidAge: true };
    }
    return null;
  };

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _managerService: ManagerService,
    private _dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    // Initialize the employee form with form controls
    this.employeeForm = this._formbuiler.group({
      employeeAge: ['', [Validators.required, this.ageValidator]],
      employeeSalary: ['', Validators.required],
      employeeName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      managerID: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    });
  }

  // Getters for form controls
  get phone() {
    return this.employeeForm.get('phone');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get designation() {
    return this.employeeForm.get('designation');
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
    // Patch the form with existing employee data
    this.employeeForm.patchValue({
      employeeName: this.data.employeeName,
      employeeAge: this.data.employeeAge,
      employeeSalary: this.data.employeeSalary,
      managerID: this.data.managerID,
      designation: this.data.designation,
      phone: this.data.phone,
      address: this.data.address
    });

    // Fetch the departments associated with the manager
    this.fetchDepartmentsAssociatedWithManager();
  }

  // Fetch the departments associated with the manager
  fetchDepartmentsAssociatedWithManager() {
    this._managerService.GetAllDepartmentsAssociatedWithManager().subscribe(departments => {
      this.departments = departments.data;
    });
  }

  // onSubmit method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      // Call the API to update the employee details
      this._employeeService.UpdateEmployee(this.data.employeeID, this.employeeForm.value).subscribe({
        next: (val: any) => {
          // Display success message and close the dialog
          this._snackBar.open("Employee updated successfully", 'Close', {
            duration: 3000
          });
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error updating employee details:', error);
        }
      });
    }
  }
}
