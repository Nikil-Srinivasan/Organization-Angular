import { Component } from '@angular/core';
import { Status } from 'src/app/models/status';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard.service';
import { CredentialsService } from 'src/app/services/auth';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html'
})
export class ManagerDashboardComponent {

  // Variables to store task counts
  newTaskCount: any;
  inProgressCount: any;
  pendingTaskCount: any;
  completedTaskCount: any;

  // Store the manager ID retrieved from the user credentials
  managerId: number | undefined = this._credentials.userValue?.nameid;

  // Store the manager ID retrieved from the user credentials
  managerName: string | undefined = this._credentials.userValue?.unique_name;

  // Configuration for the donut chart
  chartOptions: any;

  // Store manager details retrieved from the API
  managerDetails: any;

  constructor(private dasboardService: DashboardService, private _credentials: CredentialsService) { }

  ngOnInit() {
    // Load data when the component is initialized
    this.totalCount();
    this.getProfileDetails(this.managerId);
  }

  // Configure the chart options for the donut chart
  totalCount() {
    this.dasboardService.getEmployeeTaskCountByManager(this.managerId).subscribe({
      next: (response: any) => {
        const responseData = response.data;
        this.newTaskCount = responseData[Status.New];
        this.inProgressCount = responseData[Status.InProgress];
        this.pendingTaskCount = responseData[Status.Pending];
        this.completedTaskCount = responseData[Status.Completed];
        this.chartOptions = {
          series: [this.newTaskCount, this.inProgressCount, this.completedTaskCount, this.pendingTaskCount],
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

  // Function to fetch manager details based on the ID
  getProfileDetails(id: number | undefined) {
    this.dasboardService.getManagerDetails(id).subscribe({
      next: (response: any) => {
        this.managerDetails = response.data;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

}
