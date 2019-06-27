import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService : ShoppingCartService) { }

  placeOrder(order) {
    const result = this.db.list('orders').push(order);
    this.cartService.clearCart();
    return result;
  }
}
