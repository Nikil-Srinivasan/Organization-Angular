import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../pages/confirm-delete/confirm-delete.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {

  constructor(private _dialog: MatDialog) { }

  openConfirmDialog(confirmMessage: string){
    return this._dialog.open(ConfirmDeleteComponent,{
      data:{
        message: confirmMessage
      }
    })
  }
}
