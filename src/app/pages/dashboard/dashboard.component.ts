import { Component } from '@angular/core';
import { Role } from 'src/app/models/role';
import { CredentialsService } from 'src/app/services/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  // Variables to store user role status
  isAdmin: boolean;
  isManager: boolean;

  constructor(private credentialService: CredentialsService) {

    // Initialize role status to false by default
    this.isAdmin = false;
    this.isManager = false;

    // Get the user's role from the credentials service
    const role = this.credentialService.userValue?.role

    // Check user's role and update role status accordingly
    if (role === Role.Admin) {
      this.isAdmin = true;
    }
    else if (role === Role.Manager) {
      this.isManager = true;
    }
  }
}
