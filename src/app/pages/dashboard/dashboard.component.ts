import { Component, ViewEncapsulation, ViewChild ,OnInit} from '@angular/core';
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
  ApexNonAxisChartSeries,
  ApexTheme,
  ApexTitleSubtitle,
  ApexResponsive,
} from 'ng-apexcharts';

import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard-Service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};

export type ChartOption = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class AppDashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public chartOptions: any;
  public chartOption: any;
  
  TotalProducts : any;
  TotalEmployees : any;
  TotalCustomers : any;
  TotalDepartments : any;

  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;

 
  constructor(private DasboardService : DashboardService) {

    this.chartOption = {
      series: [],
      chart: {
        width: "100%",
        type: "pie"
      },
      labels: [],
      theme: {
        monochrome: {
          enabled: true
        }
      },
      title: {
        text: ""
      },
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
    
    this.chartOptions = {
      series: [
        {
          name: "Employees",
          data: []
        },
        {
          name: "Customers",
          data: []
        }
      ],
      chart: {
        type: "bar",
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: []
      }
    };
   }

  ngOnInit() 
  {
    this.loadData();
    this.TotalCount(); 
  } 

  TotalCount() 
  {
    this.DasboardService.getAllCount().subscribe(
      {
        next: (response : any) => {
          const responseData = response.data;
          this.TotalProducts = responseData.Products;
          this.TotalEmployees = responseData.Employees;
          this.TotalCustomers = responseData.Customers;
          this.TotalDepartments = responseData.Departments;
        },
        error: (error : any) => {
          console.error(error);
        }
      }
    );
  }
  
 
  loadData()
   {
    this.DasboardService.getChartDetails().subscribe(
      {
      next : (response: any) => {
        
        const data = response.data;
        const productNames = data.map((product: any) => product.productName);
        const employeeCounts = data.map((product: any) => product.employeeCount);
        const customerCounts = data.map((product: any) => product.customerCount);
        const productRevenue = data.map((product: any) => product.productRevenue);

         console.log(productNames);
         console.log(employeeCounts);
         console.log(customerCounts);
         console.log(productRevenue);
        this.chartOptions.series[0].data = employeeCounts;
        this.chartOptions.series[1].data = customerCounts;
        this.chartOptions.xaxis = { categories : productNames};
        this.chartOption.series = productRevenue;
        this.chartOption.labels = productNames;
      },
      error: (error : any) => {
        console.error(error);
      }
    });
  }

}
