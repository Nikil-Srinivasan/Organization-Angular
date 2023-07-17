import { Component, ViewEncapsulation, ViewChild ,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard-Service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class AppDashboardComponent implements OnInit {
  public chart: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Products = [];
  Employees = [];
  Customers = [];

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

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
 
  TotalProducts : any;
  TotalEmployees : any;
  TotalCustomers : any;
  TotalDepartments : any;

  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;

 
  constructor(private DasboardService: DashboardService) {
    
  

  }
  

  ngOnInit() {
    this.loadData();
    this.TotalCount(); 
    this.createChart();

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

        

       
      },
      error: (error : any) => {
        console.error(error);
      }
    });
  }

}
