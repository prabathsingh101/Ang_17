import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FileService } from '../file.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  file: any;
  url: any = '';
  constructor(private fileService: FileService ) { }

  ngOnInit() {
  }

  uploadFile = (event:any) => {

    if (event.target.files && event.target.files[0]) {

      this.file = event.target.files[0];

      console.log(this.file);

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
}
