import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ProductRoutes } from './product.routing.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes),
    MaterialModule
  ]
})
export class ProductModule { }
