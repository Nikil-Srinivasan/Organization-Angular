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
  departmentForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<DepartmentAddComponent>,
    private _departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.departmentForm = this._formBuilder.group({
      departmentName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
    });
  }

  get departmentName() {
    return this.departmentForm.get('departmentName');
  }

  ngOnInit(): void {
    this.departmentForm.patchValue(this.data);
  }

  // onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.departmentForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this._departmentService.AddDepartment(this.departmentForm.value)
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error ADDING department details:', error);
          // Handle the error and show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
