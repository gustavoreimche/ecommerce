import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavComponent } from './template/nav/nav.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { ToastContainerComponent } from '../shared/components/toast/toast-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    NavComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    CategoryComponent,
    HomeDashboardComponent,
    CreateCategoryComponent,
    ToastContainerComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    FormsModule,
    MatCardModule,
  ],
  exports: [ToastContainerComponent],
})
export class DashboardModule {}
