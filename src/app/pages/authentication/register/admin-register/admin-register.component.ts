import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, RegisterContext } from 'src/app/services/auth';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AppSideAdminRegisterComponent { 
  constructor(private router: Router,private authService: AuthenticationService) {}

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      const registerContext: RegisterContext = {
        username: this.registerForm.value.userName || '',
        email: this.registerForm.value.email || '',
        password: this.registerForm.value.password || ''
      };
      
      console.log(registerContext)

      this.authService.AdminRegister(registerContext).subscribe({
        next: response => {
          // Handle the next value
          console.log(response);
        },
        error: error => {
          // Handle the error
          console.error(error);
        },
        complete: () => {
          // Handle the complete event
          console.log('Complete');
          this.router.navigate(['/authentication/verify']);
        }
      });
    }
  }
  
}
