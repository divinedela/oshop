import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular7-data-table';
import { environment } from 'environments/environment';
import { AuthGuard } from 'shared/services/auth.guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ShoppingCartComponent,
    OrdersComponent,
    HomeComponent,
    LoginComponent,
    NoAccessComponent,
    ProductsComponent,
    ProductFilterComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
],
  imports: [
    BrowserModule, 
    SharedModule,
    AdminModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DataTableModule.forRoot(),
    RouterModule.forRoot([     
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
