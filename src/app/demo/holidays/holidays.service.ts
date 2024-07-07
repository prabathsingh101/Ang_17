import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HolidayEvents, Holidays } from './holiday.model';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  private readonly baseUrl = 'https://localhost:7226/api/Holidays/';

  constructor(private http: HttpClient) {}

  Post(holidays: Holidays) {
    return this.http.post(`${this.baseUrl}Post`, holidays)
  }

  GetAll(holidays: Holidays[]) {
    return this.http.get(`${this.baseUrl}GetAll`)
  }

  GetHolidayEvents(holidays: HolidayEvents[]) {
    return this.http.get(`${this.baseUrl}getevents`)
  }

  GetHolidayById(id:number) {
    return this.http.get(`${this.baseUrl}${id}`)
  }

  PUT(id: number, holidays: Holidays) {
    return this.http.put(`${this.baseUrl}${id}`,holidays);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}

