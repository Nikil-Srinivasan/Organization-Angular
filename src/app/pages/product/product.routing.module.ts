import { Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/models/role';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const ProductRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product',
        component: ProductComponent,
        data: {
          title: 'Product Page',
          roles : [Role.Manager,Role.Admin],
        },
        canActivate : [AuthGuard]
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
        data: {
          title: 'Product Details',
          roles : [Role.Manager,Role.Admin],
        },
        canActivate : [AuthGuard],
      },
    ]
    },
];
