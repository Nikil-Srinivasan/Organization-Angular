import { Component , ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './dialog/add/add.component';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee, EmployeeService } from 'src/app/services/EmployeeService/employee.service';

export interface productsData {
  id: number;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
  {
    id: 3,
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high',
  },
  {
    id: 4,
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
  {
    id: 5,
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
  {
    id: 6,
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  employeelist : any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'age', 'salary', 'department', 'product','edit','delete'];

  constructor(private _dialog: MatDialog, private employeeService: EmployeeService) {
    this.employeeService.GetEmployee().subscribe(response => {
      this.employeelist = response.data;
      this.dataSource = new MatTableDataSource<any>(this.employeelist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$= this.dataSource.connect();
      console.log(response.data);
    });
  }
 
  
  
  
  


  /* this._dialog.open(AddComponent);
  }

  editEmployee() {
    // Logic to edit the selected item
  } addEmployee() {
  

  deleteEmployee() {
    // Logic to delete the selected item
  }*/

}

