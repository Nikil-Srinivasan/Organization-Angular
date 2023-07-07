import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';


export interface Employee{
    name : string
    age : number
    salaray : number
    department : string
    product : string
}

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private http: HttpClient) { }
    
    GetEmployee() : Observable<any>
    {
        return this.http.get<any>("http://localhost:5005/api/Employee/GetAllEmployees");
    }
}