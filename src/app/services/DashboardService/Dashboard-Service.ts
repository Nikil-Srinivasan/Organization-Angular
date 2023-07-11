import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

    getAllCount(): Observable<any> {
    const url = 'http://localhost:5005/api/Dashboard/GetTotalCount'; 
    return this.http.get<any>(url);
    }

    getChartDetails(): Observable<any> {
      const url = 'http://localhost:5005/api/Dashboard/GetChartDetails';

      return this.http.get<any>(url);
    }
}
