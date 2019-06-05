import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as _ from 'lodash';
import { ShoppingCart } from '../models/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    const cartId = await this.getOrCreateCartId();

    return this.db.object(`/shopping-carts/${cartId}`).valueChanges()
      .pipe(map(x => new ShoppingCart(x['items'])));
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    const result = await this.createCart();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async createCart() {
    return await this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  public async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  public async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  public async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getCartItemRef(cartId, product.key);

    itemRef.valueChanges().pipe(take(1)).subscribe(item => {
      const quantity = item? (item['quantity'] + change) : 1;
      if (quantity === 0)
        itemRef.remove();
      else 
        itemRef.update(this.getUpdatedItem(product, quantity));
    });
  }

  private getUpdatedItem(product: Product, quantity: number) {
    const picked = _.pick(product, ['key', 'title', 'price', 'imageUrl']);
    return {
      title: picked.title,
      quantity: quantity,
      imageUrl: picked.imageUrl,
      price: picked.price
    };
  }

  private getCartItemRef(cartId: string, productId) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

}



