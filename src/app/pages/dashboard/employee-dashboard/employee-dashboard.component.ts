import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard-Service';
import { CredentialsService } from 'src/app/services/auth';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
 
 
  newTaskCount : any;
  inProgressCount : any;
  pendingTaskCount : any;
  completedTaskCount : any;

  employeeId: number | undefined = this._credentials.userValue?.nameid;
  employeeDetails : any;

  chartOptions : any;
 
  constructor(private DasboardService : DashboardService , private _credentials : CredentialsService) {

    
  }

  ngOnInit() {
 
    this.TotalCount(); 
    this.getProfileDetails(this.employeeId);
   }

   TotalCount() {
    this.DasboardService.getEmployeeTaskCount(this.employeeId).subscribe({
      next: (response: any) => {
        const responseData = response.data;
        this.newTaskCount = responseData[Status.New];
        this.inProgressCount = responseData[Status.InProgress];
        this.pendingTaskCount = responseData[Status.Pending];
        this.completedTaskCount = responseData[Status.Completed];
        this.chartOptions = {
          series: [this.newTaskCount,this.inProgressCount,this.completedTaskCount,this.pendingTaskCount],
          chart: {
            type: "donut"
          },
          labels: ["New", "InProgress", "Completed", "Pending"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getProfileDetails(id : number | undefined){
    this.DasboardService.getEmployeeDetails(id).subscribe({
      next : (response : any) => {
      this.employeeDetails = response.data;
      console.log(this.employeeDetails);
    }
  })
  }
  
  

}


