import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMAIL_PATTERN, NAME_PATTERN, PASSWORD_PATTERN, PHONE_PATTERN, USERNAME_PATTERN } from 'src/app/shared/regex-patterns';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';

@Component({
  selector: 'app-manager-add',
  templateUrl: './manager-add.component.html',
  styleUrls: ['./manager-add.component.scss']
})
export class ManagerAddComponent {
  // Form group for manager details
  managerForm: FormGroup;
  isSubmitting: boolean = false;
  departments: any[] = [];

  // Custom validator function to check age
  ageValidator = (control: FormControl) => {
    const age = control.value;
    if (age && age <= 20) {
      return { invalidAge: true };
    }
    return null;
  };

  constructor(
    private _formbuiler: FormBuilder,
    private _managerService: ManagerService,
    private _departmentService: DepartmentService,
    private _dialogRef: MatDialogRef<ManagerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Initialize the managerForm with form controls and validators
    this.managerForm = this._formbuiler.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      userName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      employeeAge: 0,
      employeeSalary: 0,
      employeeName: '',
      departmentID: [null, Validators.required],
      role: 1,
      managerName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      managerSalary: ['', Validators.required],
      managerAge: ['', [Validators.required, this.ageValidator]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    })
  }

  // Helper methods to access form controls and their validation status
  get phone() {
    return this.managerForm.get('phone');
  }

  get address() {
    return this.managerForm.get('address');
  }

  get email() {
    return this.managerForm.get('email');
  }

  get userName() {
    return this.managerForm.get('userName');
  }

  get password() {
    return this.managerForm.get('password');
  }

  get managerAge() {
    return this.managerForm.get('managerAge');
  }

  get managerSalary() {
    return this.managerForm.get('managerSalary');
  }

  get managerName() {
    return this.managerForm.get('managerName');
  }

  get departmentID() {
    return this.managerForm.get('departmentID');
  }

  ngOnInit(): void {
    // Populate form with data passed through MAT_DIALOG_DATA
    this.managerForm.patchValue(this.data);
    // Fetch the list of available departments
    this.fetchDepartments();
  }

  // Fetch the list of available departments from the service
  fetchDepartments() {
    this._departmentService.GetAvailableDepartmentsList().subscribe(departments => {
      this.departments = departments.data;
    })
  }

  // Submit the form data to add a new manager
  onSubmit() {
    if (this.managerForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    // Call the service to add the manager
    this._managerService.AddManager(this.managerForm.value)
      .subscribe({
        next: (val: any) => {
          // Close the dialog and indicate successful addition
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error ADDING manager details:', error);
          if (error.error?.message === 'Incorrect Password') {
            // Perform custom validation for department not found
            this.managerForm.get('departmentID')?.setErrors({ departmentNotFound: true });
          }

          if (error.error?.message === "Email already exists") {
            // Perform custom validation for email already existing
            this.managerForm.get('email')?.setErrors({ emailAlreadyExist: true });
          }

          // Handle the error and show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
