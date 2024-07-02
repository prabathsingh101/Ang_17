import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import PromptDialogComponent from './prompt-dialog/prompt-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  constructor(public dialog: MatDialog) {}

  openPromptDialog(id: number) {
    const dialogRef = this.dialog.open(PromptDialogComponent, {
      width: '250px',
      data: id
    });
   return dialogRef.afterClosed();
  }
}
