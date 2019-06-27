import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order.model';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  userId: string;
  subscription: Subscription;
  shipping = {name: '', city:'', addressLine1: '', addressLine2: ''}; 

  @Input('shopping-cart') cart: ShoppingCart;

  constructor(
    private orderService: OrderService, 
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.auth.user$
    .subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }  

}
