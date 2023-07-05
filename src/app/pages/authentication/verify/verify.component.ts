import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserVerifyContext } from 'src/app/services/auth';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  constructor(private router: Router,private authService: AuthenticationService) {}

  verifyForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    otp: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.verifyForm.controls;
  }

  verify() {
    if (this.verifyForm.valid) {
      const verifyContext: UserVerifyContext = {
        email: this.verifyForm.value.email || '',
        otp: this.verifyForm.value.otp || ''
      };     
      console.log(verifyContext)
      this.authService.verifyUser(verifyContext).subscribe({
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
          console.log('verify Complete');
          this.router.navigate(['/authentication/login']);
        }
      });
    }
  }
}
