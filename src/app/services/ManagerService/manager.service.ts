import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _http: HttpClient) { }
  
  GetAllDepartmentsAssociatedWithManager() : Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}/api/Manager/GetAllDepartmentsAssociatedWithManager`);
  }
  
  GetManagersList(): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/Manager/GetAllManagers`);
  }

  AddManager(data: any): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/Auth/Register`, data);
  }

  AppointNewManager(id: number, data: any): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/Auth/AppointNewManager?id=${id}`, data);
  }

  UpdateManager(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/api/Manager/UpdateManager?id=${id}`, data);
  }

  DeleteManager(id: number): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/api/Auth/DeleteUserById?id=${id}`);
  }

  GetEmployeesAndManagerByDepartmentId(id : number) : Observable<any>{
    // http://localhost:5005/api/Manager/GetEmployeesAndManagerByProductId?id=1
    return this._http.get(`${environment.baseUrl}/api/Manager/GetEmployeesAndManagerByDepartmentId?id=${id}`);
  }

  GetEmployeesByManagerId(id: number): Observable<any> {
    return this._http.get(`${environment.baseUrl}/api/Employee/GetAllEmployeesByManagerId?id=${id}`);
  }
}
