import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEcommerceComponent } from './home/home.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { EcommerceRoutingModule } from './ecommerce-routing.module';

@NgModule({
  declarations: [HomeEcommerceComponent],
  imports: [CommonModule, EcommerceRoutingModule],
})
export class EcommerceModule {}
