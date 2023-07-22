import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials, CredentialsService } from './credentials.service';
import { tap, map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

export interface LoginContext {
  username: string;
  password: string;
}

// Interface for user registration context
export interface RegisterContext {
  username: string;
  password: string;
  email: string;
}

// Interface for user verification context
export interface UserVerifyContext {
  email: string;
  otp: string;
}

// Interface for forgot password context
export interface ForgotPasswordContext {
  email: string;
}

// Interface for reset password context
export interface ResetPasswordContext {
  email: string;
  newPassowrd: string;
}

// Interface for resending OTP context
export interface ResendOtp {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private registered: boolean = false;

  constructor(private credentialsService: CredentialsService,
    private http: HttpClient,
    private router: Router
  ) {

  }

  // Check if the user is registered
  isRegistered(): boolean {
    return this.registered;
  }

  // Set the user's registered status
  setRegistered(status: boolean): void {
    this.registered = status;
  }

  // Method for user login
  login(context: LoginContext): Observable<any> {
    return this.http.post<{ data: string }>(`${environment.baseUrl}/api/Auth/login`, {
      userName: context.username,
      password: context.password
    }).pipe(
      // Transform the response and store credentials
      map(response => {
        const data: Credentials = {
          username: context.username,
          token: response.data
        };
        return data;
      }),
      // Save the credentials in the service
      tap(credentials => {
        this.credentialsService.setCredentials(credentials);
      })
    );
  }

  // Method for registering an admin user
  AdminRegister(context: RegisterContext): Observable<any> {
    return this.http.post<{ data: string }>(`${environment.baseUrl}/api/Auth/AdminRegister`, {
      userName: context.username,
      email: context.email,
      password: context.password
    }).pipe(
      // Transform the response and set the registered status
      map(response => {
        const responseData = response.data;
        this.setRegistered(true);
        return responseData;
      })
    );
  }

  // Method for verifying a user
  verifyUser(context: UserVerifyContext): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      }),
    };

    return this.http.post<{ data: string }>(`${environment.baseUrl}/api/Auth/Verify?email=${encodeURIComponent(context.email)}&otp=${context.otp}`, options);
  }

  // Method for handling the forgot password process
  forgotPassword(context: ForgotPasswordContext): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      }),
    };
    return this.http.post<{ data: string }>(
      `${environment.baseUrl}/api/Auth/ForgotPassword?email=${encodeURIComponent(context.email)}`,
      options
    );
  }

  // Method for resetting the user's password
  ResetPassword(context: ResetPasswordContext): Observable<any> {
    return this.http.post<{ data: string }>(`${environment.baseUrl}/api/Auth/ResetPassword`, {
      email: context.email,
      newPassword: context.newPassowrd
    }).pipe(
      // Transform the response
      map(response => {
        return response;
      })
    );
  }

  // Method for resending the OTP
  resendOtp(context: ResendOtp): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      }),
    };

    return this.http.post<{ data: string }>(
      `${environment.baseUrl}/api/Auth/ResendOtp?email=${encodeURIComponent(context.email)}`,
      options
    );
  }

  /**
   * Logs out the user and clears credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Clear the credentials (token)
    this.credentialsService.removeCredential();
    // Redirect to the login page
    return of(true);
  }
}
