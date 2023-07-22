import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // Get total count of all employees
  getAllEmployeeCount(): Observable<any> { 
    return this.http.get<any>(`${environment.baseUrl}/api/Dashboard/GetTotalEmployeeCount`);
  }

  // Get chart details
  getChartDetails(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Dashboard/GetChartDetails`);
  }

  // Get employee's task count by ID
  getEmployeeTaskCount(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Dashboard/GetEmployeeTasksCount?id=${id}`);
  }

  // Get employee's manager task count by manager's ID
  getEmployeeTaskCountByManager(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Dashboard/GetEmployeeTasksByManager?id=${id}`);
  }

  // Get manager details by ID
  getManagerDetails(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Manager/GetManagerById?id=${id}`);
  }

  // Get employee details by ID
  getEmployeeDetails(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Employee/GetEmployeeById?id=${id}`);
  }
}
