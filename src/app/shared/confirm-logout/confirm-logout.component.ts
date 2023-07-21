import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.scss']
})
export class ConfirmLogoutComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmLogoutComponent>){ }
  
  // closeDialog() {
  //   this.dialogRef.close(false);
  // }
}
