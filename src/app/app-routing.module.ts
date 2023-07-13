import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'authentication',
        loadChildren: () => import('./pages/authentication/authentication.module').then(
          (m) => m.AuthenticationModule
        ),
      },
    ],
  },

  {
    path: '',
    component: FullComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '/dashboard',
      //   pathMatch: 'full',
      // },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./pages/employee/employee.component').then((m) => m.EmployeeComponent),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./pages/product/product.component').then((m) => m.ProductComponent),
      },

    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
