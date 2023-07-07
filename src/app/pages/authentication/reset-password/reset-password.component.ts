import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { AuthenticationService, ResetPasswordContext } from 'src/app/services/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string;

  constructor(private authService : AuthenticationService, private router : Router,
  private route: ActivatedRoute,){}

  resetPasswordForm = new FormGroup({
    newPassword : new FormControl('',[
      Validators.required
    ]),
    confirmPassword : new FormControl('',[
      Validators.required
    ]),

  })


  ngOnInit() {
    this.route.queryParams.subscribe((params : any) => {
      // console.log("params : ", params.email)
      this.email = params.email
    });
  }

    resetPassword(){
      if (this.resetPasswordForm.valid) {
        const newPassword = this.resetPasswordForm.value.newPassword;
        const confirmPassword = this.resetPasswordForm.value.confirmPassword;
    
        if (newPassword !== confirmPassword) {
          // Passwords do not match
          // Handle the error or display a message to the user
          console.log("Error")
          return;
        }
        const resetPasswordContext : ResetPasswordContext = {
          email : this.email,
          newPassowrd : newPassword || ''
        }

        console.log(resetPasswordContext)

        this.authService.ResetPassword(resetPasswordContext).subscribe({
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
        })  


      }
    }
}
