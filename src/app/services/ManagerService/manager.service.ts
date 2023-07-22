import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _http: HttpClient) { }

  // Get all departments associated with a manager
  GetAllDepartmentsAssociatedWithManager(): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/Manager/GetAllDepartmentsAssociatedWithManager`);
  }

  // Get the list of managers based on provided data
  GetManagersList(data: any): Observable<any> {
    return this._http.post<any>(`${environment.baseUrl}/api/Manager/GetAllManagers`, data);
  }

  // Add a new manager
  AddManager(data: any): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/Auth/Register`, data);
  }

  // Appoint a new manager for a specific department by ID
  AppointNewManager(id: number, data: any): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/Auth/AppointNewManager?id=${id}`, data);
  }

  // Update an existing manager by ID
  UpdateManager(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/api/Manager/UpdateManager?id=${id}`, data);
  }

  // Delete a manager by ID
  DeleteManager(id: number): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/api/Auth/DeleteUserById?id=${id}`);
  }

  // Get employees and their manager by department ID
  GetEmployeesAndManagerByDepartmentId(id: number): Observable<any> {
    return this._http.get(`${environment.baseUrl}/api/Manager/GetEmployeesAndManagerByDepartmentId?id=${id}`);
  }

  // Get employees by manager ID
  GetEmployeesByManagerId(id: number): Observable<any> {
    return this._http.get(`${environment.baseUrl}/api/Employee/GetAllEmployeesByManagerId?id=${id}`);
  }
}
