import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

interface IDepartment {
  id: number;
  departmentName: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {

  employeeForm: FormGroup;

  departments: any[] = [];

  selectedDepartmentId: number | undefined;

  roles: string[] = [
    'Developer',
    'HR',
    'Sales',
    'Marketing'
  ]

  constructor(
    private _formbuiler: FormBuilder,
    private _employeeService: EmployeeService,
    private _http: HttpClient,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.employeeForm = this._formbuiler.group({
      name: '',
      age: '',
      salary: '',
      department: '',
      product: '',
    })
  }
  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
    this.fetchDepartments();
  }

  fetchDepartments() {
    this._http.get<any>('http://localhost:5005/api/Department/GetAllDepartment').subscribe(departments => {
      this.departments = departments.data;
      console.log(departments.data)
    });
  }

  //onSubmit Method is invoked when the Submit Button is clicked
  onSubmit() {
    // if (this.employeeForm.valid) {

    //   //Checks whether the data is present on the table
    //   if (this.data) {
    //     this._employeeService.UpdateEmployee(this.data.id, this.employeeForm.value).subscribe({
    //       next: (val: any) => {
    //         // this._coreService.openSnackBar('Employee details updated!');
    //         this._dialogRef.close(true);
    //       }
    //     })
    //   }
    //   // If data is not present then employee gets created
    //   else {
    //     this._employeeService.AddEmployee(this.employeeForm.value).subscribe({
    //       next: (val: any) => {
    //         // this._coreService.openSnackBar('Employee added successfully!');
    //         this._dialogRef.close(true);
    //       }
    //     })
    //   }

    // }
    console.log(this.departments)
  }
}

