import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEcommerceComponent } from './ecommerce/home/home.component';
import { CartComponent } from './ecommerce/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeEcommerceComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
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
