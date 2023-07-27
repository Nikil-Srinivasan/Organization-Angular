import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard.service';
import { ChartComponent, } from "ng-apexcharts";
import { CredentialsService } from 'src/app/services/auth';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class AdminDashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: any;

  // Store the manager ID retrieved from the user credentials
  adminName: string | undefined = this._credentials.userValue?.unique_name;

  // ViewChild elements from the template to interact with them in the component
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Variables to store total employee and department counts
  totalEmployees: number;
  totalDepartments: number;

  // MatTableDataSource used to hold the data for the table
  dataSource: MatTableDataSource<any>;

  // Observable to hold data from the service
  dataObs$: Observable<any>;
  http: any;

  constructor(private dasboardService: DashboardService, private _credentials: CredentialsService) { }

  ngOnInit() {
    // Load data when the component is initialized
    this.loadData();
  }

  loadData() {

    // Call the service to get all employee counts and department names with its count
    this.dasboardService.getAllEmployeeCount().subscribe(
      {
        next: (response: any) => {

          const data = response.data;

          const departmentNames: string[] = Object.keys(data) ?? [];
          const employeeCounts: number[] = Object.values(data) ?? [];

          this.totalDepartments = departmentNames.length;

          this.totalEmployees = employeeCounts.reduce((a: number, b: number) => {
            return a + b;
          }, 0);

          // Configure the chart options for the bar chart
          this.chartOptions = {
            series: [
              {
                name: "Total Employee",
                data: employeeCounts
              },
            ],
            chart: {
              type: "bar",
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"]
            },
            xaxis: {
              categories: departmentNames
            },
            yaxis: {
              title: {
                text: ""
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val: any) {
                  return val;
                }
              }
            }
          };
        },
        error: (error: any) => {
          console.error("Cannot fetch chart Details" + error);
        }
      });
  }
}