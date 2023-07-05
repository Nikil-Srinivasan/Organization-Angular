import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './dialog/add/add.component';

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
];

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private _dialog: MatDialog) {

  }

  addEmployee() {
    this._dialog.open(AddComponent);
  }

  editEmployee() {
    // Logic to edit the selected item
  }

  deleteEmployee() {
    // Logic to delete the selected item
  }

}

