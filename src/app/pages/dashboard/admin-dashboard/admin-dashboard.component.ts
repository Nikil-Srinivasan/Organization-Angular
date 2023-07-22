import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard-Service';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
} from 'ng-apexcharts';

export interface OverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})



export class AdminDashboardComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  // ViewChild elements from the template to interact with them in the component
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Chart options used to configure the bar chart 
  public chartOptions!: Partial<OverviewChart> | any;

  // Variables to store total employee and department counts
  totalEmployees: number;
  totalDepartments: number;

  // MatTableDataSource used to hold the data for the table
  dataSource: MatTableDataSource<any>;

  // Observable to hold data from the service
  dataObs$: Observable<any>;
  http: any;

  constructor(private dasboardService: DashboardService) { }

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
                name: 'Employees',
                data: employeeCounts,
                color: '#5D87FF',
              },
            ],

            grid: {
              borderColor: 'rgba(0,0,0,0.1)',
              strokeDashArray: 3,
              xaxis: {
                lines: {
                  show: false,
                },
              },
            },
            plotOptions: {
              bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
            },
            chart: {
              type: 'bar',
              height: 390,
              offsetX: -15,
              toolbar: { show: true },
              foreColor: '#adb0bb',
              fontFamily: 'inherit',
              sparkline: { enabled: false },
            },
            dataLabels: { enabled: false },
            markers: { size: 0 },
            legend: { show: false },
            xaxis: {
              type: 'category',
              categories: departmentNames,
              labels: {
                style: { cssClass: 'grey--text lighten-2--text fill-color' },
              },
            },
            yaxis: {
              show: true,
              min: 0,
              tickAmount: 4,
              labels: {
                style: {
                  cssClass: 'grey--text lighten-2--text fill-color',
                },
              },
            },
            stroke: {
              show: true,
              width: 3,
              lineCap: 'butt',
              colors: ['transparent'],
            },
            tooltip: { theme: 'light' },

            responsive: [
              {
                breakpoint: 600,
                options: {
                  plotOptions: {
                    bar: {
                      borderRadius: 10,
                    },
                  },
                },
              },
            ],
          };
        },
        error: (error: any) => {
          console.error("Cannot fetch chart Details" + error);
        }
      });
  }
}