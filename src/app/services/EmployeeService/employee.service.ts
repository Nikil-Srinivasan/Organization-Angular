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
        return this._http.get<any>(`${environment.baseUrl}/api/Employee/GetAllEmployees`);
    }

    AddEmployee(data: any): Observable<any> {
        return this._http.post(`${environment.baseUrl}/api/Employee/CreateEmployee`, data);
    }

    UpdateEmployee(id: number, data: any): Observable<any> {
        console.log(id,data)
        return this._http.put(`${environment.baseUrl}/api/Employee/UpdateEmployee?id=${id}`, data);
    }

    DeleteEmployee(id: number): Observable<any> {   
        return this._http.delete(`${environment.baseUrl}/api/Employee/DeleteEmployee?id=${id}`);
    }

    FetchDepartments(): Observable<any> {
        return this._http.get<any>(`${environment.baseUrl}/api/Department/GetAllDepartment`);
    }

    FetchProducts(): Observable<any> {
        return this._http.get<any>(`${environment.baseUrl}/api/Product/GetAllProducts`)
    }
}