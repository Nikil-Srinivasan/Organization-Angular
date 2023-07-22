import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';
import { Status } from 'src/app/models/status';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-task-edit',
  templateUrl: './employee-task-edit.component.html',
  styleUrls: ['./employee-task-edit.component.scss']
})
export class EmployeeTaskEditComponent {

  employeetaskForm: FormGroup;

  task: any;
  taskStatus: any;

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeTaskService: EmployeetaskService,
    private _dialogRef: MatDialogRef<EmployeeTaskEditComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.employeetaskForm = this._formbuiler.group({
      employeeID: '',
      taskStatus: ''
    })
  }

  ngOnInit(): void {
    // Get the task data from the dialog input
    this.task = this.data;

    // Map the task status value to a human-readable status string
    switch (this.data.taskStatus) {
      case 1:
        this.taskStatus = Status.New;
        break;
      case 2:
        this.taskStatus = Status.InProgress;
        break;
      case 3:
        this.taskStatus = Status.Completed;
        break;
      case 4:
        this.taskStatus = Status.Pending;
        break;
      default:
        this.taskStatus = 'Unknown Status';
    }

    // Set the initial values of the form fields based on the task data
    this.employeetaskForm.patchValue({
      employeeID: this.data.employeeId,
      taskStatus: this.data.taskStatus
    });

    console.log(this.task);
    console.log(this.data.taskStatus);
  }

  // onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.employeetaskForm.valid) {
      // Call the service to update the employee task status
      this._employeeTaskService.UpdateEmployeeTaskStatus(this.data.taskID, this.employeetaskForm.value).subscribe({
        next: (val: any) => {
          // Show a success message to the user
          this._snackBar.open("Task Edited Successfully!", "close");
          // Close the dialog after successful update
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error updating employee details:', error);
          // Handle the error and show an error message to the user if needed
        }
      });
    }
  }
}
