// Import necessary Angular modules and components
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  // Constructor with DI for MAT_DIALOG_DATA and MatDialogRef
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>
  ) { }

  // Function to close the dialog with a false value
  closeDialog() {
    this.dialogRef.close(false);
  }
}
