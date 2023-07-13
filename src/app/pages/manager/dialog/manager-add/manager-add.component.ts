import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { EMAIL_PATTERN, PASSWORD_PATTERN, USERNAME_PATTERN } from 'src/app/shared/regex-patterns';

@Component({
  selector: 'app-manager-add',
  templateUrl: './manager-add.component.html',
  styleUrls: ['./manager-add.component.scss']
})
export class ManagerAddComponent {
  managerForm: FormGroup;

  products: any[] = [];

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
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<ManagerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.managerForm = this._formbuiler.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      userName: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      employeeAge: 0,
      employeeSalary: 0,
      employeeName: '',
      departmentID: 0,
      productID: ['', Validators.required],
      role: 1,
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

  get productID() {
    return this.managerForm.get('productID');
  }

  ngOnInit(): void {
    this.managerForm.patchValue(this.data);
    this.fetchProducts();
  }

  fetchProducts() {
    this._productService.GetProductsList().subscribe(products => {
      this.products = products.data;
      console.log(products.data);
    })
  }
  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    this._managerService.AddManager(this.managerForm.value)
      .subscribe(
        (response: any) => {
          console.log("Data sent successfully");
          this._dialogRef.close(true);
        },
        (error: any) => {
          console.log(this.managerForm.value);
          console.error("Error sending data:", error);
          // Handle error if needed
        }
      );
  }
}