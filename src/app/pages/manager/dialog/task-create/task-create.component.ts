import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NAME_PATTERN } from 'src/app/shared/regex-patterns';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  selectedDate: Date;
  createTaskForm: FormGroup;
  isSubmitting: boolean = false;
  minDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<TaskCreateComponent>,
    private _employeeTaskService: EmployeetaskService,
    private _snackbar: SnackbarService
  ) {
    this.minDate = new Date();  // Set the minDate to the current date

    // Initialize the form with its controls and validators
    this.createTaskForm = this._formBuilder.group({
      taskName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      taskDescription: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      taskDueDate: ['', Validators.required],
      taskStatus: 1
    });
  }

  // Convenience getter methods to access form controls easily
  get taskName() {
    return this.createTaskForm.get('taskName');
  }
  get taskDescription() {
    return this.createTaskForm.get('taskDescription');
  }
  get taskDueDate() {
    return this.createTaskForm.get('taskDueDate');
  }

  ngOnInit(): void { }

  // onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.createTaskForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    // Extract the selected date from the form and convert it to UTC format
    this.selectedDate = new Date(this.createTaskForm.get('taskDueDate')?.value);
    this.selectedDate.setHours(5);
    this.selectedDate.setMinutes(30);
    const utcDate = this.selectedDate.toISOString();

    // Add the employeeId to the form value
    const formValueWithEmployeeId = {
      ...this.createTaskForm.value,
      taskDueDate: utcDate,
      employeeId: this.data.employeeId
    };

    // Send the task creation request to the server through the EmployeeTaskService
    this._employeeTaskService.createEmployeeTask(formValueWithEmployeeId)
      .subscribe({
        next: (val: any) => {
          // Show a success message using a snackbar
          this._snackbar.openSnackBar("Task Created Successfully!", "close");
          // Close the dialog after successful task creation
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error ADDING Task details:', error);
          // Handle the error and show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
