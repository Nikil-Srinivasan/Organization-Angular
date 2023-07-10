import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';


export interface IEmployee {
    name: string
    age: number
    salary: number
    department: string
    product: string
}

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private _http: HttpClient) { }

    GetEmployees(): Observable<any> {
        return this._http.get<any>(`${environment.apiUrl}/api/Employee/GetAllEmployees`);
    }

    AddEmployee(data: any): Observable<any> {
        return this._http.post(`${environment.apiUrl}/api/Employee/CreateEmployee`, data);
    }

    UpdateEmployee(id: number, data: any): Observable<any> {
        return this._http.put(`${environment.apiUrl}/api/Employee/UpdateEmployee${id}`, data);
    }

    DeleteEmployee(id: number): Observable<any> {
        return this._http.delete(`${environment.apiUrl}/api/Employee/DeleteEmployee?id=${id}`);
    }

}