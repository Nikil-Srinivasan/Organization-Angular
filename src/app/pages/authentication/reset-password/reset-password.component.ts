import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, ResetPasswordContext } from 'src/app/services/auth';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { PASSWORD_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  email: string;
  hideNewPassword = true;
  hideConfirmPassword = true;
  resetPasswordForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router,
    private route: ActivatedRoute, private _snackbar: SnackbarService) {

    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(PASSWORD_PATTERN)
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }



  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  };

  get newPassword(): any {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword(): any {
    return this.resetPasswordForm.get('confirmPassword');
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.email = params.email
    });

    // Subscribe to valueChanges of newPassword FormControl
    this.resetPasswordForm.get('newPassword')?.valueChanges.subscribe(() => {
      this.resetPasswordForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      const confirmPassword = this.resetPasswordForm.value.confirmPassword;

      if (newPassword !== confirmPassword) {
        // Passwords do not match
        return;
      }
      const resetPasswordContext: ResetPasswordContext = {
        email: this.email,
        newPassowrd: newPassword || ''
      }

      this.authService.resetPassword(resetPasswordContext).subscribe({
        error: error => {
          if (error.error?.message === 'Your OTP is expired.') {
            this._snackbar.openSnackBar("Your OTP is expired.Please try again", "close");
          }
          this.router.navigate(['/authentication/forgot-password']);
        },
        complete: () => {
          // Password changed successfully.
          this._snackbar.openSnackBar("Password Reset Successfull", "close");
          this.router.navigate(['/authentication/login']);
        }
      })


    }
  }
}
