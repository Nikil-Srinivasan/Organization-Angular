import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NAME_PATTERN } from 'src/app/shared/regex-patterns';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  selectedDate : Date;
  createTaskForm: FormGroup;
  isSubmitting: boolean = false;
  minDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<TaskCreateComponent>,
    private _employeeTaskService: EmployeetaskService,
  ) {
    this.minDate = new Date();  // Set the minDate to the current date

    this.createTaskForm = this._formBuilder.group({
      taskName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      taskDescription: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      taskDueDate: ['', Validators.required]
    });
  }

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

  
    this._employeeTaskService.CreateEmployeeTask(formValueWithEmployeeId)
      .subscribe({
        next: (val: any) => {
          console.log(formValueWithEmployeeId);
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error ADDING Task details:', error);
          console.log(formValueWithEmployeeId);
          // Handle the error and show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
