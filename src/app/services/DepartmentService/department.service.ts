import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _http: HttpClient) { }

  // Get the list of all departments
  GetDepartmentsList(): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/Department/GetAllDepartment`);
  }

  // Get the list of available departments
  GetAvailableDepartmentsList(): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/Department/GetAvailableDepartments`);
  }

  // Add a new department
  AddDepartment(data: any): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/Department/CreateDepartment`, data);
  }

  // Update an existing department by ID
  UpdateDepartment(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/api/Department/UpdateDepartment?id=${id}`, data);
  }

  // Delete a department by ID
  DeleteDepartment(id: number): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/api/Department/DeleteDepartment?id=${id}`);
  }
}
