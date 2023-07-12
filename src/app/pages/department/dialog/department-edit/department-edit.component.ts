import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent {
  departmentForm: FormGroup;

  constructor(
    private _formbuiler: FormBuilder,
    private _departmentService: DepartmentService,
    private _dialogRef: MatDialogRef<DepartmentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.departmentForm = this._formbuiler.group({
      departmentName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
    })
  }

  get departmentName(){
    return this.departmentForm.get('departmentName');
  }

  ngOnInit(): void {
    this.departmentForm.patchValue({
      departmentName: this.data.departmentName,
    });
  }

  
  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this._departmentService.UpdateDepartment(this.data.departmentID,this.departmentForm.value)
      .subscribe(
        (response: any) => {
          console.log("Data sent successfully");
          this._dialogRef.close(true);
        },
        (error: any) => {
          console.log(this.departmentForm.value);
          console.error("Error sending data:", error);
          // Handle error if needed
        }
      );
  }
}
