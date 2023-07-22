import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-task-description',
  templateUrl: './employee-task-description.component.html'
})
export class EmployeeTaskDescriptionComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
