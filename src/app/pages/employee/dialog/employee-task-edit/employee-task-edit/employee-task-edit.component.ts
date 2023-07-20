import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-task-edit',
  templateUrl: './employee-task-edit.component.html',
  styleUrls: ['./employee-task-edit.component.scss']
})
export class EmployeeTaskEditComponent {

  employeetaskForm: FormGroup;

  task : any ;

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeTaskService: EmployeetaskService,
    private _dialogRef: MatDialogRef<EmployeeTaskEditComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  )
   {
    this.employeetaskForm = this._formbuiler.group({
      employeeID: '' ,
      taskStatus : ''
    })
  }


  ngOnInit(): void {
    this.task = this.data;
    this.employeetaskForm.patchValue({
      employeeID: this.data.employeeId,
      taskStatus: this.data.taskStatus
    });    
    console.log(this.task);
    console.log(this.data.taskStatus);
  }

 
  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.employeetaskForm.valid) {
        this._employeeTaskService.UpdateEmployeeTask(this.data.taskID, this.employeetaskForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open("Task Edited Successfully!", "close");
            this._dialogRef.close(true);
            
          },
          error: (error: any) => {
            console.error('Error updating employee details:', error);
            // Handle the error and show an error message to the user
          }
        });
    }
  }
}
