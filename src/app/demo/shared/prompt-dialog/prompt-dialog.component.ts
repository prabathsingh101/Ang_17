import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@Component({
  selector: 'app-prompt-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './prompt-dialog.component.html',
  styleUrl: './prompt-dialog.component.scss'
})
export default class PromptDialogComponent implements OnInit {

  data: any = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    //console.log(this.data)
  }

}
