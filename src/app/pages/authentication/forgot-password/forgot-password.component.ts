import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService, UserVerifyContext, ForgotPasswordContext, ResendOtp } from 'src/app/services/auth';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EMAIL_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  countdown: number = 180;

  openOtpTemplate: boolean = false

  isLoading: boolean = false
  constructor(private authService: AuthenticationService, private router: Router, private _snackbar: SnackbarService) { }

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
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

  forgotPassword() {
    this.isLoading = true;
    if (this.forgotPasswordForm.valid) {
      const forgotPasswordContext: ForgotPasswordContext = {
        email: this.forgotPasswordForm.value.email || '',
      };
      this.authService.forgotPassword(forgotPasswordContext).subscribe({
        next: response => {
          // Handle the next value
          this.openOtpTemplate = true
          this.startCountdown()
          this._snackbar.openSnackBar(`We have sent OTP to ${forgotPasswordContext.email}`, "close");
        },
        error: error => {
          // Handle the error       
          if (error.error?.message === 'Email does not exists') {
            // Perform custom validation for user not found
            this.forgotPasswordForm.get('email')?.setErrors({ emailNotFound: true });
          }
        },
      });
    }
  }

  verifyOtp() {
    if (this.verifyForm.valid) {
      const verifyContext: UserVerifyContext = {
        email: this.forgotPasswordForm.value.email || '',
        otp: this.verifyForm.value.otp || ''
      };

      this.authService.verifyUser(verifyContext).subscribe({
        next: response => {
          // Handle the next value
          // Redirect to the reset password page with the email as a query parameter
          this.router.navigate(['/authentication/reset-password'], { queryParams: { email: this.forgotPasswordForm.value.email } });
        },
        error: error => {
          // Handle the error
          if (error.error?.message === 'Maximum OTP resend limit reached.') {
            // Perform custom validation for user not found
            this._snackbar.openSnackBar('Maximum OTP depth is reached. Please contact the administrator.', 'Close');
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
          this._snackbar.openSnackBar("Verified Successfully", "close");
        }
      });
    }
  }

  resendOTP() {
    const resendOtp: ResendOtp = {
      email: this.forgotPasswordForm.value.email || '',
    };

    this.authService.resendOtp(resendOtp).subscribe({
      next: response => {
        // Handle the next value
        this.countdown = 180;
        this.formatTime(this.countdown);
        this._snackbar.openSnackBar(`We have sent OTP to ${resendOtp.email}`, "close");
        this.formatTime(this.countdown)
      },
      error: error => {
        // Handle the error
        if (error.error?.message === 'Maximum OTP resend limit reached.') {
          // Perform custom validation for user not found
          this._snackbar.openSnackBar('Maximum OTP depth is reached. Please contact the administrator.', 'Close');
        }
      },
    })
  }
}
