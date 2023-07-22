import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from '../services/auth';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private credential: CredentialsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.credential.userValue;
        if (user) {
            // check if route is restricted by role
            if (route.data['roles'] && route.data['roles'].indexOf(user.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['authentication/login']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['authentication/login']);
        return true;
    }
}