import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavComponent } from './template/nav/nav.component';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ToastContainerComponent } from '../shared/components/toast/toast-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
import localePt from '@angular/common/locales/pt';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

registerLocaleData(localePt);

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
    ToastContainerComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DashboardRoutingModule,
    NgbModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    CKEditorModule,
  ],
  exports: [ToastContainerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
