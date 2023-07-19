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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Products = [];
  Employees = [];
  Customers = [];

  public PieChartData = [];

  public seriesHighlight: any = {
    // Pie series draw an overlay with the same shape as the pie segment.
    color: "#000",
    opacity: 0.75,
    border: {
      width: 1,
      color: "#000",
      opacity: 0.5,
    },
  };
 
  newTaskCount : any;
  inProgressCount : any;
  pendingTaskCount : any;
  completedTaskCount : any;

  employeeId: number | undefined = this._credentials.userValue?.nameid;

  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  chartOptions : any;
 
  constructor(private DasboardService : DashboardService , private _credentials : CredentialsService) {

    
  }

  ngOnInit() {
    this.loadData();
    this.TotalCount(); 
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

        this.Products = productNames;
        this.Employees = employeeCounts;
        this.Customers = customerCounts;
        this.PieChartData = productRevenue.map((revenue : any , index : any) => [revenue, productNames[index]]);
      },
      error: (error : any) => {
        console.error(error);
      }
    });
  }
}


