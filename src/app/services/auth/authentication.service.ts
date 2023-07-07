import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credentials, CredentialsService } from './credentials.service';
import { tap,map } from 'rxjs/operators';
import { environment } from '@environments/environment';

export interface LoginContext {
  username: string;
  password: string;
}

export interface RegisterContext{
  username : string,
  password : string,
  email : string
}

export interface UserVerifyContext{
  email : string,
  otp : string
}

export interface forgotPasswordContext{
  email : string
}

export interface ResetPasswordContext{
  email : string,
  newPassowrd : string
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private registered: boolean = false;


  constructor(private credentialsService: CredentialsService,    private http: HttpClient) {
    
  }
  isRegistered(): boolean {
    return this.registered;
  }

  setRegistered(status: boolean): void {
    this.registered = status;
  }

  //  The pipe function is used to chain the map operator 
  //  after the post method of the HttpClient. The map operator 
  //  transforms the response object by extracting the data property from
  //  it and logging it to the console. 
  //  Finally, the transformed responseData is returned from the map operator.
 
  login(context: LoginContext): Observable<any> {
    // Make the POST request to the authentication endpoint
    return this.http.post<{ data: string }>(`${environment.apiUrl}/api/Auth/login`, {
      userName: context.username,
      password: context.password
    }).pipe(map(response => {
    const data: Credentials = {
      username: context.username,
      token: response.data
    };
    return data;
    }),
    tap(credentials => {
      this.credentialsService.setCredentials(credentials);
      })
    );
  }

  AdminRegister(context: RegisterContext): Observable<any> {
    return this.http.post<{ data: string }>(`${environment.apiUrl}/api/Auth/AdminRegister`, {
      userName: context.username,
      email: context.email,
      password: context.password
    }).pipe(
      map(response => {
        const responseData = response.data;
        this.setRegistered(true);
        return responseData;
      })
    );
  }
  
  verifyUser(context: UserVerifyContext): Observable<any> {
    const params = new HttpParams()
      .set('email', context.email)
      .set('otp', context.otp);
  
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      }),
      params: params
    };
  
    return this.http.post<{ data: string }>(`${environment.apiUrl}/api/Auth/verify`, null, options);
  }
  

  forgotPassword(context : forgotPasswordContext) : Observable<any>{
    const params = new HttpParams()
    .set('email', context.email)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      }),
      params: params
    };
    return this.http.post<{ data: string }>(`${environment.apiUrl}/api/Auth/forgot-password`, null, options);

  }

  ResetPassword(context : ResetPasswordContext) : Observable<any>{
    return this.http.post<{ data: string }>(`${environment.apiUrl}/api/Auth/reset-password`, {
      email: context.email,
      newPassword: context.newPassowrd
    }).pipe(
      map(response => {
        const responseData = response.data;
        return responseData;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

}