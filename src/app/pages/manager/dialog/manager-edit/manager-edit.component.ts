import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/services/ManagerService/manager.service'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.scss']
})
export class ManagerEditComponent implements OnInit {
  managerForm: FormGroup;


  ageValidator = (control: FormControl) => {
    const age = control.value;
    if (age && age <= 20) {
      return { invalidAge: true };
    }
    return null;
  };

  constructor(
    private _formbuiler: FormBuilder,
    private _productService: ProductService,
    private _managerService: ManagerService,
    private _dialogRef: MatDialogRef<ManagerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.managerForm = this._formbuiler.group({
      managerName: ['', [Validators.required,Validators.pattern(USERNAME_PATTERN)]],
      managerSalary: ['', Validators.required],
      managerAge: ['', [Validators.required, this.ageValidator]],
      phone : ['',Validators.required],
      address : ['',Validators.required]
    })
  }

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
    this.managerForm.patchValue({
      managerName: this.data.managerName,
      managerAge: this.data.managerAge,
      managerSalary: this.data.managerSalary,
    });       
  }


  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.managerForm.valid) {
      console.log(this.data.managerId, this.managerForm.value)
        // this._managerService.UpdateManager(this.data.managerId, this.managerForm.value).subscribe({
        //   next: (val: any) => {
        //     // this._coreService.openSnackBar('Manager details updated!');
        //     this._dialogRef.close(true);
        //     console.log(val)
        //   },
        //   error: (error: any) => {
        //     console.error('Error updating manager details:', error);
        //     // Handle the error and show an error message to the user
        //   }
        // });
    }
  }
}
