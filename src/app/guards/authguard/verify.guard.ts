import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isRegistered()) {
      return true;
    } else {
      return this.router.createUrlTree(['/authentication/admin-register']);
    }
  }
}

export const canActivateTeam: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(VerifyGuard).canActivate();
};
