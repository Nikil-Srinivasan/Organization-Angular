import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { DepartmentService } from 'src/app/services/DepartmentService/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USERNAME_PATTERN } from 'src/app/shared/regex-patterns';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface IDepartment {
  id: number;
  departmentName: string;
}

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;

  selectedDepartment : any

  departments: any[] = [];

  ageValidator = (control: FormControl) => {
    const age = control.value;
    if (age && age <= 20) {
      return { invalidAge: true };
    }
    return null;
  };

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _managerService: ManagerService, 
    private _dialogRef: MatDialogRef<EmployeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.employeeForm = this._formbuiler.group({
      employeeAge: ['', [Validators.required, this.ageValidator]],
      employeeSalary: ['', Validators.required],
      employeeName: ['', [Validators.required,Validators.pattern(USERNAME_PATTERN)]],
      managerID: ['', Validators.required],
      designation : ['',Validators.required],
      address : ['',Validators.required],
      phone : ['',Validators.required],
    })
  }
   
  get phone() {
    return this.employeeForm.get('designation');
  }

  get address() {
    return this.employeeForm.get('designation');
  }
    
  get designation() {
    return this.employeeForm.get('designation');
  }
  
  get employeeAge() {
    return this.employeeForm.get('employeeAge');
  }

  get employeeSalary() {
    return this.employeeForm.get('employeeSalary');
  }

  get employeeName() {
    return this.employeeForm.get('employeeName');
  }

  get managerID() {
    return this.employeeForm.get('managerID');
  }

  ngOnInit(): void {
    this.employeeForm.patchValue({
      employeeName: this.data.employeeName,
      employeeAge: this.data.employeeAge,
      employeeSalary: this.data.employeeSalary,
      managerID: this.data.managerID,
      designation : this.data.designation,
      phone : this.data.phone,
      address : this.data.phone
    });    
    
    this.fetchDepartmentsAssociatedWithManager();    
  }

  fetchDepartmentsAssociatedWithManager() {
    this._managerService.GetAllDepartmentsAssociatedWithManager().subscribe(departments => {
      this.departments = departments.data;
    });
  }
  
  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    if (this.employeeForm.valid) {
        this._employeeService.UpdateEmployee(this.data.employeeID, this.employeeForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open("Employee added successfully",'Close',{
              duration : 3000
            })
            this._dialogRef.close(true);
          },
          error: (error: any) => {
            console.error('Error updating employee details:', error);
          }
        });
    }
  }

}
