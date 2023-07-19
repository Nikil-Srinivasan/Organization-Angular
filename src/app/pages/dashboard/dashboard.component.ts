import { Component } from '@angular/core';
import { Role } from 'src/app/models/role';
import { CredentialsService } from 'src/app/services/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isAdmin: boolean;
  isManager: boolean;

  constructor(private credentialService : CredentialsService){
    this.isAdmin = false;
    this.isManager = false;
    const role = this.credentialService.userValue?.role
    
    if(role === Role.Admin){
      this.isAdmin = true;
    }else if(role === Role.Manager){
      this.isManager = true;
    }
    
  
  }

}
 