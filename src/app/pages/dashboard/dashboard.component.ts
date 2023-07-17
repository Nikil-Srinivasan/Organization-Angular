import { Component, ViewEncapsulation, ViewChild ,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard-Service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class AppDashboardComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public chartOptions: any;
  public chartOption: any;

  TotalProducts : any;
  TotalEmployees : any;
  TotalCustomers : any;
  TotalDepartments : any;

  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;

  constructor(private DasboardService : DashboardService) { }

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
 
 
  loadData()  {

    this.DasboardService.getChartDetails().subscribe(
    {
      next : (response: any) => {

        const data = response.data;
        const productNames = data.map((product: any) => product.productName);
        const employeeCounts = data.map((product: any) => product.employeeCount);
        const customerCounts = data.map((product: any) => product.customerCount);
        const productRevenue = data.map((product: any) => product.productRevenue);

        this.chartOptions = {
            series: [
              {
                name: 'Employees',
                data: employeeCounts,
                color: '#5D87FF',
              },
              {
                name: 'Customers',
                data: customerCounts,
                color: '#49BEFF',
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
              categories:productNames,
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
                      borderRadius: 3,
                    },
                  },
                },
              },
            ],
          };

    this.chartOption = {

      series: productRevenue,

      chart: {
        width: "100%",
        type: "pie"
      },

      labels: productNames,

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
      },
      error: (error : any) => {
        console.error(error);
      }
    });

  }

}