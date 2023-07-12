import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ProductAddComponent } from './dialog/product-add/product-add.component'; 
import { ProductEditComponent } from './dialog/product-edit/product-edit.component';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/ProductService/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  productlist: any;
  dataSource: MatTableDataSource<any>;
  dataObs$: Observable<any>;
  displayedColumns: string[] = ['name', 'revenue', 'edit', 'delete'];

  constructor(private _dialog: MatDialog,private _productService: ProductService) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  GetProducts() {
    this._productService.GetProducts().subscribe(response => {
      this.productlist = response.data;
      this.dataSource = new MatTableDataSource(this.productlist);
      this.dataSource.paginator = this.paginator;
      this.dataObs$ = this.dataSource.connect();
    });
  }

  OpenAddProductDialog(){
    const dialogRef = this._dialog.open(ProductAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.GetProducts();
        }
      }
    })
  }

  OpenEditProduct(data: any) {
    // console.log(data)
    const dialogRef = this._dialog.open(ProductEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetProducts();
        }
      }
    })
  }

  DeleteProduct(id: number) {
    this._productService.DeleteProduct(id).subscribe({
      next: (res) => {
        // this._coreService.openSnackBar('Employee Deleted!');
        this.GetProducts();
      },
      error: console.log,
    })
  }

}
