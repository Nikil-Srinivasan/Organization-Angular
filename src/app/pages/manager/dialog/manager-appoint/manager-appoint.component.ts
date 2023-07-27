// Import required modules, services, and regular expression patterns for form validations
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMAIL_PATTERN, NAME_PATTERN, PASSWORD_PATTERN, PHONE_PATTERN, USERNAME_PATTERN } from 'src/app/shared/regex-patterns';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-manager-appoint',
  templateUrl: './manager-appoint.component.html',
  styleUrls: ['./manager-appoint.component.scss']
})
export class ManagerAppointComponent {
  managerForm: FormGroup;
  isSubmitting: boolean = false;

  // Custom validator function to check if the age is valid (greater than 20)
  ageValidator = (control: FormControl) => {
    const age = control.value;
    if (age && age <= 20) {
      return { invalidAge: true }; // Return an error object if the age is invalid
    }
    return null; // Return null if the age is valid
  };

  constructor(
    private _formbuiler: FormBuilder,
    private _managerService: ManagerService,
    private _dialogRef: MatDialogRef<ManagerAppointComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService
  ) {
    // Create the managerForm using FormBuilder to define form controls and validations
    this.managerForm = this._formbuiler.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]], // Email control with required and pattern validation
      userName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]], // User Name control with required and pattern validation
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]], // Password control with required and pattern validation
      managerName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]], // Manager Name control with required and pattern validation
      managerSalary: ['', Validators.required], // Manager Salary control with required validation
      managerAge: ['', [Validators.required, this.ageValidator]], // Manager Age control with required and custom ageValidator validation
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]], // Phone control with required and pattern validation
      address: ['', Validators.required], // Address control with required validation
    });
  }

  // Convenience getters for form controls to easily access them in the template
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

  ngOnInit(): void { }

  // onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.managerForm.invalid) {
      return; // If the form is invalid, return without submitting
    }

    this.isSubmitting = true; // Set the isSubmitting flag to true to indicate form submission

    // Call the service to appoint a new manager using the data provided in the form
    this._managerService.appointNewManager(this.data.managerId, this.managerForm.value)
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true); // Close the dialog with a success flag when the operation is successful
          this._snackbar.openSnackBar("Manager appointed successfully", 'Close');
        },
        error: (error: any) => {
          console.error('Error ADDING manager details:', error);
          if (error.error?.message === "Email already exists") {
            // Perform custom validation for user not found
            this.managerForm.get('email')?.setErrors({ emailAlreadyExist: true });
          }
          // Handle any errors that occur during the appointment process
        },
        complete: () => {
          this.isSubmitting = false; // Set the isSubmitting flag to false after completion (success or error)
        }
      });
  }
}
