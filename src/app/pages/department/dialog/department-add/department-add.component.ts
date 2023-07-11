import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';

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
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<DepartmentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.departmentForm = this._formbuiler.group({
      departmentName: '',
    })
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
