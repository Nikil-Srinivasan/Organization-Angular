import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface ICustomer {
  name: string
  phoneNumber: Number
  email:string
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient) { }

  GetCustomers(): Observable<any> {
      return this._http.get<any>(`${environment.baseUrl}/api/Customer/GetAllCustomer`);
  }

  AddCustomer(data: any): Observable<any> {
      console.log(data)
      return this._http.post(`${environment.baseUrl}/api/Customer/CreateCustomer`, data);
      
  }

  UpdateCustomer(id: number, data: any): Observable<any> {
      console.log(id,data)
      return this._http.put(`${environment.baseUrl}/api/Customer/UpdateCustomer?id=${id}`, data);
  }

  DeleteCustomer(id: number): Observable<any> {   
      return this._http.delete(`${environment.baseUrl}/api/Customer/DeleteCustomer?id=${id}`);
  }

  FetchProducts(): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/Product/GetAllProducts`)
}
}
