import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { ManagerService } from 'src/app/services/ManagerService/manager.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  productId: string;
  productName: string = "Product 1"
  productManager: string = "Name";
  employeelist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'age', 'salary', 'department', 'product'];
  
  EmployeesAndManagerDetails : any

  constructor(private route: ActivatedRoute, private _managerService: ManagerService, private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      // Call a method to fetch product details based on the productId
      this._managerService.GetEmployeesAndManagerByProductId(parseInt(this.productId)).subscribe(response =>{
        console.log(response.data)
        this.EmployeesAndManagerDetails = response.data
        this.employeelist = response.data.employees;
        this.dataSource = new MatTableDataSource(this.employeelist);
        this.dataSource.paginator = this.paginator;
        this.dataObs$ = this.dataSource.connect();
      })

      console.log(this.productId)
      this.fetchProductDetails();
      // this.GetEmployees();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  GetEmployees() {
    this._employeeService.GetEmployeesList().subscribe(response => {

    });
  }
  fetchProductDetails() {
    // Implement your logic to fetch product details based on the productId
    // GetManagerByProductId(){}
  }

  GetEmployeesAndManager(){
    
  }
  

  GetProductManager(id: number){
    // this._productService.GetManagerByProductId(id).subscribe( response => {
    //   this.productManager = response.managerName;
    // })
  }

}
