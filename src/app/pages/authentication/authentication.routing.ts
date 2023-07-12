import { Routes } from '@angular/router';
import { AppSideLoginComponent } from './login/login.component';
import { AppSideAdminRegisterComponent } from './register/admin-register/admin-register.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyGuard, canActivateTeam } from 'src/app/guards/authguard/verify.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      
    ],
  },
];
