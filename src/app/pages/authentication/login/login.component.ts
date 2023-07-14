import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, Credentials, CredentialsService, LoginContext, } from 'src/app/services/auth';
import { ValidationService } from 'src/app/services/validation.service';
import { PASSWORD_PATTERN, USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit{

  constructor(private authService: AuthenticationService, private router : Router,private validationService: ValidationService, private credentialsService : CredentialsService) {
  }
  ngOnInit(): void {
    console.log(this.credentialsService.isAuthenticated())
    if(this.credentialsService.isAuthenticated()){
      this.router.navigateByUrl("/dashboard")
    }
  }

  getErrorStateMatcher(): ValidationService {
    return this.validationService;
  }

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern(USERNAME_PATTERN),

    ]), 
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_PATTERN)
    ]),
  });


  getUsername(){
    return this.loginForm?.get("userName")
  }

  getPassword(){
    return this.loginForm?.get("password")
  }  
  
  login() {
    if (this.loginForm.valid) {
      
      const loginContext: LoginContext = {
        username: this.loginForm.value.userName || '',
        password: this.loginForm.value.password || '',
      };

      console.log(loginContext);
      this.authService.login(loginContext).subscribe({
        next: (credentials: Credentials) => {
          // Handle the successful login
          console.log('Logged in successfully:', credentials);
          this.router.navigate(['/dashboard']);
          
        },
        error: (error: HttpErrorResponse) => {
          // Handle the error during login
          if (error.error instanceof ErrorEvent) {
            // Client-side error occurred
            console.error('An error occurred:', error.error.message);
          } else {
            // Server-side error occurred
            console.error(`HTTP Error ${error.status}: ${error.error.message}`);
            if (error.error?.message === 'User Not Found') {
              // Perform custom validation for user not found
              this.loginForm.get('userName')?.setErrors({ userNotFound: true });
            }
            if (error.error?.message === 'Incorrect Password') {
              // Perform custom validation for user not found
              this.loginForm.get('password')?.setErrors({ incorrectPassword: true });
            }
            
          }
        }
      });
    }
  }
}
