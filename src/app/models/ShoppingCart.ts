import { ShoppingCartItem } from './ShoppingCartItem';
import { Product } from './product.model';
export class ShoppingCart {
  cartItems : ShoppingCartItem[] = [];

  constructor(public itemsMap: {[productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      const cartItem = itemsMap[productId];
      this.cartItems.push(new ShoppingCartItem({key: productId, ...cartItem}));
    }
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.cartItems) 
      count += this.cartItems[productId].quantity;
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.cartItems)
      sum += this.cartItems[productId].totalPrice;
    return sum;
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key]; 
    return item ? item.quantity: 0;
  }

}
