import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent {
  departmentForm: FormGroup;

  constructor(
    private _formbuiler: FormBuilder,
    private _departmentService: DepartmentService,
    private _dialogRef: MatDialogRef<DepartmentAddComponent>,
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
    this.departmentForm.patchValue(this.data);
  }


  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this._departmentService.AddDepartment(this.departmentForm.value)
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
