import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.scss']
})
export class ManagerEditComponent implements OnInit {
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
    private _dialogRef: MatDialogRef<ManagerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Initialize the managerForm with form controls and validators
    this.managerForm = this._formbuiler.group({
      managerName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      managerSalary: ['', Validators.required],
      managerAge: ['', [Validators.required, this.ageValidator]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // Convenience getters to access form controls in the template
  get phone() {
    return this.managerForm.get('phone');
  }

  get address() {
    return this.managerForm.get('address');
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

  ngOnInit(): void {
    // Populate the form with existing manager data received via MAT_DIALOG_DATA
    this.managerForm.patchValue({
      managerName: this.data.managerName,
      managerAge: this.data.managerAge,
      managerSalary: this.data.managerSalary,
      phone: this.data.phone,
      address: this.data.address
    });
  }

  // onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.managerForm.valid) {
      // If the form is valid, update the manager details using the ManagerService
      this._managerService.UpdateManager(this.data.managerId, this.managerForm.value).subscribe({
        next: (val: any) => {
          // Manager details updated successfully
          // Close the dialog and display a success message
          this._dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error updating manager details:', error);
          // Handle the error and show an error message to the user
        }
      });
    }
  }
}
