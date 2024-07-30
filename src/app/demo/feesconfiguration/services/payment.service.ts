import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly baseUrl = 'https://localhost:7226/api/payment/';

  constructor(private http: HttpClient) {}

  Post(feespaid: Payment) {
    return this.http.post(`${this.baseUrl}create`, feespaid);
  }

  GetAll() {
    return this.http.get<Payment[]>(`${this.baseUrl}getfeeshead`);
  }

  getFeesHeadById(id: number) {
    return this.http.get(`${this.baseUrl}getbyidfeeshead/${id}`);
  }

  PUT(id: number, feeshead: Payment) {
    return this.http.put(`${this.baseUrl}updatefeeshead/${id}`, feeshead);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}deletefeeshead/${id}`);
  }


}
