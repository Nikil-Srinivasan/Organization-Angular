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
 
  TotalProducts : any;
  TotalEmployees : any;
  TotalCustomers : any;
  TotalDepartments : any;

  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;

 
  constructor(private DasboardService : DashboardService) {}

  ngOnInit() {
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
