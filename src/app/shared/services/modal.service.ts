import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../components/ui/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private _dialog: MatDialog) { }

  confirmDialog(title: string, message?: string) {
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      width: '300px',
      panelClass: 'hello',
      data: { title: title, message: message }
    })

    return dialogRef.afterClosed();
  }




}
