import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    constructor(private http: HttpClient) { }
    protected url = 'https://jsonplaceholder.typicode.com/todos/';

    getEmployees(): Observable<any> {
        return this.http.get(this.url).pipe(map(res => res));
    }
}