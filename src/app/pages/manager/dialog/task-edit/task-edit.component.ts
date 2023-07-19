import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NAME_PATTERN } from 'src/app/shared/regex-patterns';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent {
  selectedDate : Date;
  editTaskForm: FormGroup;
  isSubmitting: boolean = false;
  minDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<TaskEditComponent>,
    private _employeeTaskService: EmployeetaskService,
  ) {
    this.minDate = new Date();  // Set the minDate to the current date

    this.editTaskForm = this._formBuilder.group({
      taskName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      taskDescription: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      taskDueDate: ['', Validators.required]
    });
  }

  get taskName() {
    return this.editTaskForm.get('taskName');
  }
  get taskDescription() {
    return this.editTaskForm.get('taskDescription');
  }
  get taskDueDate() {
    return this.editTaskForm.get('taskDueDate');
  }
  ngOnInit(): void {
    this.editTaskForm.patchValue({
      taskName: this.data.editTaskFormData.taskName,
      taskDescription: this.data.editTaskFormData.taskDescription,
      taskDueDate: this.data.editTaskFormData.taskDueDate
    });  
   }

  // onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.editTaskForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    this.selectedDate = new Date(this.editTaskForm.get('taskDueDate')?.value);
    console.log("Selected Date : "+ this.selectedDate)
    const utcDate = this.selectedDate.toISOString();

    // Add the employeeId to the form value
    const formValueWithEmployeeId = {
      ...this.editTaskForm.value,
      taskDueDate: utcDate,
      employeeId: this.data.employeeId
    };
    console.log("Form :" + formValueWithEmployeeId);
    this._employeeTaskService.UpdateEmployeeTask(this.data.editTaskFormData.taskID,formValueWithEmployeeId)
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error Updating Task details:', error);
          // Handle the error and show an error message to the user
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
