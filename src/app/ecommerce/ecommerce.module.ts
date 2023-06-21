import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEcommerceComponent } from './home/home.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { CartComponent } from './cart/cart.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeEcommerceComponent, CartComponent],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    DashboardModule,
    NgbCarouselModule,
  ],
})
export class EcommerceModule {}
