import { ShoppingCart } from './ShoppingCart';

export class Order {
    datePlaced: number;
    items: any[];
    totalPrice: number;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.totalPrice = shoppingCart.totalPrice;
        this.items = shoppingCart.cartItems.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price : i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice,
            }
        });
    }
}