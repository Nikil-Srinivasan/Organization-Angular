import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserVerifyContext, forgotPasswordContext } from 'src/app/services/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  countdown: number = 60;

  openOtpTemplate : boolean = false 

  isLoading : boolean = false 
  constructor(private authService : AuthenticationService, private router : Router){}

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  verifyForm = new FormGroup({
    otp: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.forgotPasswordForm.controls;
  }

  startCountdown() {
    const timer = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  forgotPassword(){
    console.log(this.forgotPasswordForm.value)
    this.isLoading = true;
    if(this.forgotPasswordForm.valid){
      const forgotPasswordContext : forgotPasswordContext = {
        email: this.forgotPasswordForm.value.email || '',
      };
      this.authService.forgotPassword(forgotPasswordContext).subscribe({
        next: response => {
          // Handle the next value
          this.openOtpTemplate = true
          this.startCountdown()
          console.log(response);
        },
        error: error => {
          // Handle the error
          console.error(error);
        },
        complete: () => {
          // Handle the complete event
          console.log('Complete');
          this.isLoading = false;

        }
      });

    } 
  }


  verifyOtp() {
    if (this.verifyForm.valid) {
      const verifyContext: UserVerifyContext = {
        email: this.forgotPasswordForm.value.email || '',
        otp: this.verifyForm.value.otp || ''
      };     
  
      console.log(verifyContext);
  
      this.authService.verifyUser(verifyContext).subscribe({
        next: response => {
          // Handle the next value
          console.log(response);
          console.log(this.forgotPasswordForm.value);
  
          // Redirect to the reset password page with the email as a query parameter
          this.router.navigate(['/authentication/reset-password'], { queryParams: { email: this.forgotPasswordForm.value.email } });
        },
        error: error => {
          // Handle the error
          console.error(error);
        },
        complete: () => {
          // Handle the complete event
          console.log('verify Complete');
        }
      });
    }
  }
  

}
