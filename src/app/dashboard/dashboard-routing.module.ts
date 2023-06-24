import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent,
    children: [
      { path: 'products', component: ProductComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'categorys', component: CategoryComponent },
      { path: 'status', component: StatusComponent },
      { path: '', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
