// Import necessary Angular modules and components
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { NAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent {
  // FormGroup to handle the department add form
  departmentForm: FormGroup;

  // Variable to track form submission status
  isSubmitting: boolean = false;

  // Constructor with DI for FormBuilder, MatDialogRef, DepartmentService, and MAT_DIALOG_DATA
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<DepartmentAddComponent>,
    private _departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Initialize the departmentForm with the departmentName field and validations
    this.departmentForm = this._formBuilder.group({
      departmentName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
    });
  }

  // Getter to easily access the departmentName form control
  get departmentName() {
    return this.departmentForm.get('departmentName');
  }

  // OnInit lifecycle hook to set the initial value for departmentName based on the provided data
  ngOnInit(): void {
    this.departmentForm.patchValue(this.data);
  }

  // onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    // If the form is invalid, return and do not proceed with form submission
    if (this.departmentForm.invalid) {
      return;
    }

    // Set the form submission status to true
    this.isSubmitting = true;

    // Call the DepartmentService to add the new department
    this._departmentService.AddDepartment(this.departmentForm.value)
      .subscribe({
        next: (val: any) => {
          // Close the dialog with a success response
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error ADDING department details:', error);
          // Handle the error and show an error message to the user
        },
        complete: () => {
          // Reset the form submission status to false when the operation is complete
          this.isSubmitting = false;
        }
      });
  }
}
