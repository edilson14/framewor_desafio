import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

const MESSAGE_DURATION_IN_MILESECONDS = 1000;

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {


  constructor(private _matSnackBar: MatSnackBar) { }

  showMessage(message: string) {
    this._matSnackBar.open(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: MESSAGE_DURATION_IN_MILESECONDS,

    })
  }

}
