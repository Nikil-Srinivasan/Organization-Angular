import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { NAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent {
  // FormGroup to handle the department edit form
  departmentForm: FormGroup;
  
  // Variable to track form submission status
  isSubmitting: boolean = false;

  // Constructor with DI for FormBuilder, DepartmentService, MatDialogRef, and MAT_DIALOG_DATA
  constructor(
    private _formbuiler: FormBuilder,
    private _departmentService: DepartmentService,
    private _dialogRef: MatDialogRef<DepartmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Initialize the departmentForm with the departmentName field and validations
    this.departmentForm = this._formbuiler.group({
      departmentName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
    })
  }

  // Getter to easily access the departmentName form control
  get departmentName(){
    return this.departmentForm.get('departmentName');
  }

  // OnInit lifecycle hook to set the initial value for departmentName based on the provided data
  ngOnInit(): void {
    this.departmentForm.patchValue({
      departmentName: this.data.departmentName,
    });
  }

  // onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this.isSubmitting = true;
    this._departmentService.UpdateDepartment(this.data.departmentID, this.departmentForm.value)
      .subscribe({
        next: (val: any) => {
          // Close the dialog with a success response
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error updating department details:', error);
          // Handle the error and show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
