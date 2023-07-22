import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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

  // Get observable for new tasks
  getNewTasks(): Observable<any[]> {
    return this.newTasks$.asObservable();
  }

  // Get observable for task count
  getTaskCount(): Observable<number> {
    return this.taskCount$.asObservable();
  }

  // Fetch new tasks and update observables
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

  // Get new tasks by employee ID
  GetEmployeeNewTask(id: number | undefined): Observable<any> {
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

  // Get in-progress tasks by employee ID
  GetEmployeeInProgressTask(id: number | undefined): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetInProgressEmployeeTasksByEmployeeId?id=${id}`);
  }

  // Get pending tasks by employee ID
  GetEmployeePendingTask(id: number | undefined): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetPendingEmployeeTasksByEmployeeId?id=${id}`);
  }

  // Get all tasks for an employee by ID and pageObject
  GetAllEmployeeTask(id: number, pageObject: any): Observable<any> {
    return this._http.post<any>(`${environment.baseUrl}/api/EmployeeTask/GetEmployeeTasksByEmployeeId?employeeid=${id}`, pageObject);
  }

  // Create a new employee task
  CreateEmployeeTask(data: any): Observable<any> {
    return this._http.post<any>(`${environment.baseUrl}/api/EmployeeTask/CreateEmployeeTasks`, data);
  }

  // Get completed tasks by employee ID
  GetEmployeeCompletedTask(id: number | undefined): Observable<any> {
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetCompletedEmployeeTasksByEmployeeId?id=${id}`);
  }

  // Get the count of new employee tasks by ID
  GetNewEmployeeTaskCount(id: number | undefined): any {
    return this._http.get<any>(`${environment.baseUrl}/api/EmployeeTask/GetNewTaskCount?id=${id}`);
  }

  // Update an existing employee task by ID
  UpdateEmployeeTask(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/api/EmployeeTask/UpdateEmployeeTask?id=${id}`, data);
  }

  // Update the status of an existing employee task by ID
  UpdateEmployeeTaskStatus(id: number, data: any): Observable<any> {
    return this._http.put(`${environment.baseUrl}/api/EmployeeTask/UpdateEmployeeTaskStatus?id=${id}`, data);
  }

  // Get the status from the numeric value
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

  // Delete an employee task by ID
  DeleteEmployeeTask(id: number): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/api/EmployeeTask/DeleteEmployeeTask?id=${id}`);
  }
}
