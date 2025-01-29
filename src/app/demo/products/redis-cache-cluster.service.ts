import { Injectable } from '@angular/core';
import { Products } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RedisCacheClusterService {
  private readonly baseUrl = 'https://localhost:7226/api/Products/';

  constructor(private http: HttpClient) {}

  GetAllProd(product: Products[]) {
    return this.http.get(`${this.baseUrl}all`);
  }

  GetProdById(id: number) {
    return this.http.get(`${this.baseUrl}${id}`);
  }
}
