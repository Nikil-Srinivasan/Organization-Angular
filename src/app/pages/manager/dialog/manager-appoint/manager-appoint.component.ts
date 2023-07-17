import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMAIL_PATTERN, PASSWORD_PATTERN, USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-manager-appoint',
  templateUrl: './manager-appoint.component.html',
  styleUrls: ['./manager-appoint.component.scss']
})
export class ManagerAppointComponent {
  managerForm: FormGroup;

  // Custom validator function
  ageValidator = (control: FormControl) => {
    const age = control.value;
    if (age && age <= 20) {
      return { invalidAge: true };
    }
    return null;
  };

  constructor(
    private _formbuiler: FormBuilder,
    private _managerService: ManagerService,
    private _dialogRef: MatDialogRef<ManagerAppointComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.managerForm = this._formbuiler.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      userName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      managerName: ['',
        [
          Validators.required,
          Validators.pattern(USERNAME_PATTERN)
        ]
      ],
      managerSalary: ['', Validators.required],
      managerAge: ['', [Validators.required, this.ageValidator]]
    })
  }

  get email() {
    return this.managerForm.get('email');
  }

  get userName() {
    return this.managerForm.get('userName');
  }

  get password() {
    return this.managerForm.get('password');
  }

  get managerAge() {
    return this.managerForm.get('managerAge');
  }

  get managerSalary() {
    return this.managerForm.get('managerSalary');
  }

  get managerName() {
    return this.managerForm.get('managerName');
  }

  ngOnInit(): void { }

  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this._managerService.AppointNewManager(this.data.managerId, this.managerForm.value)
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error ADDING manager details:', error);
          // Handle the error and show an error message to the user
        }
      });
  }
}
