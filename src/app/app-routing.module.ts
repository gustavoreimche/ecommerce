import { HomeEcommerceComponent } from './ecommerce/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { ProductComponent } from './dashboard/product/product.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { CategoryComponent } from './dashboard/category/category.component';

const routes: Routes = [
  { path: '', component: HomeEcommerceComponent, children: [] },
  {
    path: 'admin',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
