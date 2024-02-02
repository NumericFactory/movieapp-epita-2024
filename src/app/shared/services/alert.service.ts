import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackbar: MatSnackBar) { }

  show(message: string, type?: 'error' | 'success' | 'info') {
    this.snackbar.open(message, 'Fermer', {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'showbar'
    })
  }
}
