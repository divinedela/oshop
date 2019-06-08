import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule} from "@angular/fire/auth";
import { AngularFireDatabaseModule} from "@angular/fire/database";
import { DataTableModule } from "angular7-data-table";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { NoAccessComponent } from './no-access/no-access.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ShoppingCartComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrdersComponent,
    HomeComponent,
    LoginComponent,
    NoAccessComponent,
    ProductFormComponent,
    ProductsComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
],
  imports: [
    BrowserModule, 
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DataTableModule.forRoot(),
    RouterModule.forRoot([
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
     
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: OrdersComponent, canActivate: [AuthGuard] },

      { path: 'shopping-cart', component:ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component : NoAccessComponent},
      { path: '', component : ProductsComponent},
     
    ]),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
