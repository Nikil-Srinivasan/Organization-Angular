import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html'
})
export class TaskDescriptionComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
