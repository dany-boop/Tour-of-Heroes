import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor(private _snackBar: MatSnackBar) {}


  add(message: string) {
    /* Se muestra un snackBar -> ya no hace falta componente Messages */
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}