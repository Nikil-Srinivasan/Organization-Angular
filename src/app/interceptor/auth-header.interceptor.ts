import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '../services/auth';
import { environment } from '@environments/environment';
import { Role } from '../models/role';
import { EmployeetaskService } from '../services/EmployeeTaskService/employeetask.service';

@Injectable()
export class AuthHeadersInterceptor implements HttpInterceptor {


  constructor(private credentials : CredentialsService,
              private employeeTaskService : EmployeetaskService ){
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    
    const user = this.credentials.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${user.token}`
          }
      });
    }
    console.log('Auth interceptor');
    console.log(request.url);
    
    return next.handle(request);
  }

  
} 