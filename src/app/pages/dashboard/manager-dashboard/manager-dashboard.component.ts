import { Component } from '@angular/core';
import { Status } from 'src/app/models/status';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard-Service';
import { CredentialsService } from 'src/app/services/auth';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent {

  newTaskCount : any;
  inProgressCount : any;
  pendingTaskCount : any;
  completedTaskCount : any;

  managerId: number | undefined = this._credentials.userValue?.nameid;

  chartOptions : any;

  managerDetails : any;
 
  constructor(private DasboardService : DashboardService , private _credentials : CredentialsService) {

    
  }

  ngOnInit() {
 
    this.TotalCount(); 
    this.getProfileDetails(this.managerId);
   }

   TotalCount() {
    this.DasboardService.getEmployeeTaskCountByManager(this.managerId).subscribe({
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
    this.DasboardService.getManagerDetails(id).subscribe({
      next : (response : any) => {
      this.managerDetails = response.data;
      console.log(this.managerDetails);
    }
  })
  }
  
}
