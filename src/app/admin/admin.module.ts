import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular7-data-table';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { AuthGuard } from 'shared/services/auth.guard.service';
import { AdminAuthGuard } from './services/admin-auth.guard.service';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: 'admin/products',
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      { path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      }
    ]),
    SharedModule,
    DataTableModule
  ],
  providers: [ AdminAuthGuard ]
})
export class AdminModule { }
