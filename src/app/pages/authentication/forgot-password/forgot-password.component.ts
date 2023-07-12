import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService, UserVerifyContext, ForgotPasswordContext, ResendOtp } from 'src/app/services/auth';
import { EMAIL_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  countdown: number = 180;

  openOtpTemplate : boolean = false 

  isLoading : boolean = false 
  constructor(private authService : AuthenticationService, private router : Router,private _snackBar: MatSnackBar){}

  forgotPasswordForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern(EMAIL_PATTERN)
    ]),
     
  });

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  verifyForm = new FormGroup({
    otp: new FormControl('',
     [Validators.required]
     
     ),
  });


  get otp() {
    return this.verifyForm.get('otp');
  }

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
      const forgotPasswordContext : ForgotPasswordContext = {
        email: this.forgotPasswordForm.value.email || '',
      };
      this.authService.forgotPassword(forgotPasswordContext).subscribe({
        next: response => {
          // Handle the next value
          this.openOtpTemplate = true
          this.startCountdown()
          console.log(response);
          this._snackBar.open(`We have sent OTP to ${forgotPasswordContext.email}`, "close");

        },
        error: error => {
          // Handle the error
          console.error(error);
          console.error(`HTTP Error ${error.status}: ${error.error.message}`);
          
          if (error.error?.message === 'Email does not exists') {
            // Perform custom validation for user not found
            this.forgotPasswordForm.get('email')?.setErrors({ emailNotFound: true });
          }

        },
        complete: () => {
          // Handle the complete event  
          console.log('Complete');
   

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
          console.error(`HTTP Error ${error.status}: ${error.error.message}`);
          if (error.error?.message === 'Maximum OTP resend limit reached.') {
            // Perform custom validation for user not found
            this._snackBar.open('Maximum OTP depth is reached. Please contact the administrator.', 'Close');
          }
          if (error.error?.message === 'Invalid OTP , Please try again') {
            // Perform custom validation for user not found
            this.verifyForm.get('otp')?.setErrors({ invalidOtp: true });
          }
          if (error.error?.message === 'Your Otp has been expired , Please try again') {
            // Perform custom validation for user not found
            this.verifyForm.get('otp')?.setErrors({ otpExpired: true });
          }
        },
        complete: () => {
          // Handle the complete event
          console.log('verify Complete');
          this._snackBar.open("Verified Successfully", "close");
        }
      });
    }
  }

  resendOTP(){

    const resendOtp: ResendOtp = {
      email: this.forgotPasswordForm.value.email || '',
    };    


    this.authService.resendOtp(resendOtp).subscribe({
      next: response => {
        // Handle the next value
        this.countdown = 180;
        this.formatTime(this.countdown);
        this._snackBar.open(`We have sent OTP to ${resendOtp.email}`, "close");
        this.formatTime(this.countdown)
      },
      error: error => {
        // Handle the error
        console.error(error);
        console.error(`HTTP Error ${error.status}: ${error.error.message}`);
        if (error.error?.message === 'Maximum OTP resend limit reached.') {
          // Perform custom validation for user not found
          this._snackBar.open('Maximum OTP depth is reached. Please contact the administrator.', 'Close');
        }
      },
      complete: () => {
        // Handle the complete event
        console.log('verify Complete');
      }
    })

  }

}
