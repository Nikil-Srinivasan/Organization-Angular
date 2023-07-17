import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface IProduct {
  name: string
  revenue: Number
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  GetProductsList(): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/Product/GetAllProducts`)
  }

  AddProduct(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.baseUrl}/api/Product/CreateProduct`, data);
  }

  UpdateProduct(id: number, data: any): Observable<any> {
    console.log(id, data)
    return this._http.put(`${environment.baseUrl}/api/Product/UpdateProduct?id=${id}`, data);
  }

  DeleteProduct(id: number): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/api/Product/DeleteProduct?id=${id}`);
  }

}