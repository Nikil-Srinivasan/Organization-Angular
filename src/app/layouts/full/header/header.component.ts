import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { EmployeetaskService } from 'src/app/services/EmployeeTaskService/employeetask.service';
import { AuthenticationService, CredentialsService } from 'src/app/services/auth';
import { ConfirmLogoutComponent } from 'src/app/shared/confirm-logout/confirm-logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  showBellIcon = false;
  newTaskCount: number;


  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private employeetaskService: EmployeetaskService,
    private router: Router
  ) { }

  onLogoutHandle(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';

    const dialogRef = this.dialog.open(ConfirmLogoutComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.authenticationService.logout().subscribe(() => {
          // After logout is complete, navigate to the login page
          this.router.navigate(['/authentication/login']);
        });
      }
    });
  }

  ngOnInit() {
    this.checkUserRoleForNotification();
    this.employeetaskService.getTaskCount().subscribe(value => {
      this.newTaskCount = value;
    })
  }

  checkUserRoleForNotification() {
    const user = this.credentialsService.userValue?.role;

    if (user == Role.Employee) {
      this.showBellIcon = true;
      const employeeId = this.credentialsService.userValue?.nameid;

    }
  }



}
