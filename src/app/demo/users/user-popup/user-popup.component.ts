import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MAT_DIALOG_DATA,MatDialog,MatDialogTitle, MatDialogActions,MatDialogClose,MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';




@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [SharedModule, MatDialogModule, MatFormFieldModule,
     MatButtonModule, MatCardModule, MatInputModule, MatSelectModule,
     MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent implements OnInit {

  data:any = inject(MAT_DIALOG_DATA);

  constructor(private ref: MatDialogRef<UserPopupComponent>) {}

  inputdata: any;

  closemessage:any ='close message using directive';

  closepopup() {
    this.ref.close('closed using function');
  }
  ngOnInit(): void {
    this.inputdata = this.data.title;
  }
}
