import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeetaskService {

  constructor(private _http: HttpClient) { }

  GetEmployeeNewTask(id: number | undefined){
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetNewEmployeeTasksByEmployeeId?id=${id}`);
  }

  GetEmployeeInProgressTask(id: number | undefined){
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetOngoingEmployeeTasksByEmployeeId?id=${id}`);
  }

  GetEmployeePendingTask(id: number | undefined){
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetPendingEmployeeTasksByManagerId?id=${id}`);
  }

  
  UpdateEmployeeTask(id: number, data: any): Observable<any> {
    console.log(id, data)
    return this._http.put(`${environment.baseUrl}/api/EmployeeTask/UpdateEmployeeTaskStatus?id=${id}`, data);
  }

}
