import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Status } from 'src/app/models/status';


@Injectable({
  providedIn: 'root'
})
export class EmployeetaskService {

  private newTasks$ = new BehaviorSubject<any[]>([]);
  private taskCount$ = new BehaviorSubject<number>(0);
  
  constructor(private _http: HttpClient) { }

  getNewTasks(): Observable<any[]> {
    return this.newTasks$.asObservable();
  }

  getTaskCount(): Observable<number> {
    return this.taskCount$.asObservable();
  }

  fetchNewTasks(id: number | undefined): any {
    this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetNewEmployeeTasksByEmployeeId?id=${id}`).subscribe(
      response => {
        const tasks = response.data;
        this.newTasks$.next(tasks);
        this.taskCount$.next(tasks.length);
      },
      error => {
        console.error('Error fetching new tasks:', error);
      }
    );
  }

  GetEmployeeNewTask(id: number | undefined){
    this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetNewEmployeeTasksByEmployeeId?id=${id}`).subscribe(
      response => {
        const tasks = response.data;
        this.newTasks$.next(tasks);
        this.taskCount$.next(tasks.length);
      },
      error => {
        console.error('Error fetching new tasks:', error);
      }
    );
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetNewEmployeeTasksByEmployeeId?id=${id}`);
  }

  GetEmployeeInProgressTask(id: number | undefined){
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetInProgressEmployeeTasksByEmployeeId?id=${id}`);
  }

  GetEmployeePendingTask(id: number | undefined){
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetPendingEmployeeTasksByManagerId?id=${id}`);
  }

  GetAllEmployeeTask(id:number){
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetEmployeeTasksByEmployeeId?id=${id}`);
  }
  
  CreateEmployeeTask(data: any): Observable<any> {
    return this._http.post<any>(`${environment.baseUrl}/api/EmployeeTask/CreateEmployeeTasks`, data);
  }


  GetEmployeeCompletedTask(id: number | undefined){
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetCompletedEmployeeTasksByEmployeeId?id=${id}`);
  }
  
  GetNewEmployeeTaskCount(id: number | undefined){
    const data = this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetNewTaskCount?id=${id}`);
    
  }

  UpdateEmployeeTask(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/api/EmployeeTask/UpdateEmployeeTask?id=${id}`, data);
  }

  UpdateEmployeeTaskStatus(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/api/EmployeeTask/UpdateEmployeeTaskStatus?id=${id}`, data);
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

  DeleteEmployeeTask(id: number): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/api/EmployeeTask/DeleteEmployeeTask?id=${id}`);
  }
}
