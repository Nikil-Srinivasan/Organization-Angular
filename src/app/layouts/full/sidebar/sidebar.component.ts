import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { NavItem } from './nav-item/nav-item';
import { Role } from 'src/app/models/role';
import { CredentialsService } from 'src/app/services/auth';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems: NavItem[] = [];

  constructor(
    public navService: NavService,
    private credentialsService: CredentialsService

    ) {

  }

  ngOnInit(): void {
    const user = this.credentialsService.userValue?.role
    if(user === Role.Admin){
      console.log(user)
      this.navItems = this.filterNavItemsByRole(Role.Admin);
    }
    else if(user === Role.Employee){
        this.navItems = this.filterNavItemsByRole(Role.Employee);
    }
    else if(user === Role.Manager){
      this.navItems = this.filterNavItemsByRole(Role.Manager);
    }
    else{
      this.navItems = [];
    }
  }

  private filterNavItemsByRole(role: Role): NavItem[] {
    return navItems.filter((item) => {
      if (item.roles) {
        return item.roles.includes(role);
      }
      return false;
    });
  }
  
}
