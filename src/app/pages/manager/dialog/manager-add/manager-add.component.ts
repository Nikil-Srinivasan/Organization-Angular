import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-manager-add',
  templateUrl: './manager-add.component.html',
  styleUrls: ['./manager-add.component.scss']
})
export class ManagerAddComponent {
  managerForm: FormGroup;

  products: any[] = [];

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeService: EmployeeService,
    private _managerService: ManagerService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<ManagerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.managerForm = this._formbuiler.group({
      email:'',
      userName: '',
      password:'',
      employeeAge: 0,
      employeeSalary: 0,
      employeeName:'',
      departmentID: 0,
      productID: '',
      role:1,
      managerName:'',
      managerSalary:'',
      managerAge:''
    })
  }
  ngOnInit(): void {
    this.managerForm.patchValue(this.data);
    this.fetchProducts();
  }

  fetchProducts(){
    this._employeeService.GetProductsList().subscribe(products => {
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