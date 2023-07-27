import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private _http: HttpClient) { }

    // Get the list of employees based on provided data
    getEmployeesList(data: any): Observable<any> {
        return this._http.post<any>(`${environment.baseUrl}/api/Employee/GetAllEmployees`, data);
    }

    // Get employee details by ID
    getEmployeeById(id: number): Observable<any> {
        return this._http.get<any>(`${environment.baseUrl}/api/Employee/GetEmployeeById?id=${id}`);
    }

    // Add a new employee
    addEmployee(data: any): Observable<any> {
        return this._http.post(`${environment.baseUrl}/api/Auth/Register`, data);
    }

    // Update an existing employee by ID
    updateEmployee(id: number, data: any): Observable<any> {
        return this._http.put(`${environment.baseUrl}/api/Employee/UpdateEmployee?id=${id}`, data);
    }

    // Delete an employee by ID
    deleteEmployee(id: number): Observable<any> {
        return this._http.delete(`${environment.baseUrl}/api/Auth/DeleteUserById?id=${id}`);
    }
}
