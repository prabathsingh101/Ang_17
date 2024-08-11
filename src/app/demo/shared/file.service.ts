import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url: string = 'https://localhost:7226/api/file';

  constructor(private http: HttpClient) {}

  public uploadFile(formData: FormData) {
    return this.http.post(`${this.url}/upload`, formData, {
        reportProgress: true,
        observe: 'events',
    });
  }

  upload(file:any): Observable<any> {

    debugger
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${this.url}/upload`, formData);
  }

  public download(fileUrl: string) {
    return this.http.get(`${this.url}/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  public getPhotos() {
    return this.http.get(`${this.url}/getPhotos`);
  }
}
