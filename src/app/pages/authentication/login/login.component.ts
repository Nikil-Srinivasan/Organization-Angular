import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, Credentials, LoginContext } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  constructor(private authService: AuthenticationService, private router : Router) {
  }
  
  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });
  
  
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
        error: (error) => {
          // Handle the error during login
          console.error('Login failed:', error);
        }
      });
    }
  }
}
