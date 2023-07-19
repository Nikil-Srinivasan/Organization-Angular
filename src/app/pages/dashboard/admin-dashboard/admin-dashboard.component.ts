import { Component, ViewEncapsulation, ViewChild ,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from 'src/app/services/DashboardService/Dashboard-Service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})



export class AdminDashboardComponent implements OnInit {

  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  chartOptions: any = {};
  chartOption: any = {};
  
  TotalEmployees: number;
  TotalDepartments: number;

  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;

  constructor(private DasboardService : DashboardService) {

    this.loadData();

   }

  ngOnInit()
    {

      //this.TotalCount();
      this.loadData();
    }

 
 
  loadData()  {

    this.DasboardService.getAllEmployeeCount().subscribe(
    {
      next : (response: any) => {

        const data = response.data;
        
        const departmentNames = Object.keys(data);
        const employeeCounts : number[] = Object.values(data);
        
        this.TotalDepartments = departmentNames.length;
        
        this.TotalEmployees = employeeCounts.reduce((a: number, b: number) => {
          return a + b;
        }, 0);

        this.chartOptions = {
            series: [
              {
                name: 'Employees',
                data:  employeeCounts,
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
              categories:departmentNames,
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
      error: (error : any) => {
        console.error(error);
      }
    });

  }

}