import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Status } from 'src/app/models/status';


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

  GetAllEmployeeTask(id:number){
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetAllEmployeeTasksByEmployeeId?id=${id}`);
  }
  
  CreateEmployeeTask(data: any): Observable<any> {
    return this._http.post<any>(`${environment.baseUrl}/api/EmployeeTask/CreateEmployeeTasks`, data);
  }
// http://localhost:5005/api/EmployeeTask/UpdateEmployeeTask?id=1

  UpdateEmployeeTask(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/api/EmployeeTask/UpdateEmployeeTask?id=${id}`, data);
  }

  getStatusFromNumber(statusNumber: number): Status {
    switch (statusNumber) {
      case 1:
        return Status.New;
      case 2:
        return Status.InProgress;
      case 3:
        return Status.Completed;
      case 4:
        return Status.Pending;
      default:
        return Status.New; // Default value if the numeric value doesn't match any enum value
    }
  }
}
