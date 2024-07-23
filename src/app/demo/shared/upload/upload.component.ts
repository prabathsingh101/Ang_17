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

  constructor(private fileService: FileService ) { }

  ngOnInit() {
  }

  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    console.log('formdata', formData)

    this.fileService.upload(formData)
      .subscribe({
        next: (event:any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }
}
