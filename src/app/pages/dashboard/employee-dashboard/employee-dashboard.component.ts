import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard.service';
import { CredentialsService } from 'src/app/services/auth';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  // Variables to store task counts
  newTaskCount: any;
  inProgressCount: any;
  pendingTaskCount: any;
  completedTaskCount: any;

  // Store the employee ID retrieved from the user credentials
  employeeId: number | undefined = this._credentials.userValue?.nameid;

  // Store employee details retrieved from the API
  employeeDetails: any;

  // Configuration for the donut chart
  chartOptions: any;

  constructor(private DasboardService: DashboardService, private _credentials: CredentialsService) { }

  ngOnInit() {

    // Load data when the component is initialized
    this.totalCount();
    this.getProfileDetails(this.employeeId);
  }

  // Function to fetch the total task counts for the employee
  totalCount() {
    this.DasboardService.getEmployeeTaskCount(this.employeeId).subscribe({
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

  // Function to fetch employee details based on the employeeID
  getProfileDetails(id: number | undefined) {
    this.DasboardService.getEmployeeDetails(id).subscribe({
      next: (response: any) => {
        this.employeeDetails = response.data;
      }
    })
  }
}


