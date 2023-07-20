import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

    getAllEmployeeCount(): Observable<any> { 

    return this.http.get<any>(`${environment.baseUrl}/api/Dashboard/GetTotalCount`);
    }

    getChartDetails(): Observable<any> {
      
      return this.http.get<any>(`${environment.baseUrl}/api/Dashboard/GetChartDetails`);
    }

    getEmployeeTaskCount(id : number | undefined) : Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}/api/Dashboard/GetEmployeeTasksCount?id=${id}`);
    }

    getEmployeeTaskCountByManager(id : number | undefined) : Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}/api/Dashboard/GetEmployeeTasksByManager?id=${id}`);
    }

    getManagerDetails(id : number | undefined) : Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}/api/Manager/GetManagerById?id=${id}`);
    }

    getEmployeeDetails(id : number | undefined) : Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}/api/Employee/GetEmployeeById?id=${id}`);
    }
}
