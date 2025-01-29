import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FileService } from '../file.service';

@Component({
    selector: 'app-upload',
    imports: [SharedModule],
    templateUrl: './upload.component.html',
    styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit {
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  file!: File; // Variable to store file to Upload

  url: any = '';


  constructor(private fileService: FileService) {}

  ngOnInit() {}

  uploadFile = (files: any) => {

    if (files.target.files && files.target.files[0]) {

      this.file = files.target.files[0];

      console.log('file',this.file);
      console.log('name',this.file.name);

      var reader = new FileReader();

      reader.readAsDataURL(files.target.files[0]);

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      this.fileService.upload(this.file).subscribe((res: any) => {
        console.log(res);
      });
    }
  };
  onupload(){
    this.fileService.upload(this.file).subscribe((res: any) => {
      console.log(res);
    });
  }
}
