import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserVerifyContext } from 'src/app/services/auth';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent {
  constructor(private router: Router,private authService: AuthenticationService) {}

  verifyForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    otp: new FormControl('', [Validators.required]),
  });

  verify() {
    if (this.verifyForm.valid) {
      const verifyContext: UserVerifyContext = {
        email: this.verifyForm.value.email || '',
        otp: this.verifyForm.value.otp || ''
      };     
      this.authService.verifyUser(verifyContext).subscribe({
        complete: () => {
          // Handle the complete event
          this.router.navigate(['/authentication/login']);
        }
      });
    }
  }
}
