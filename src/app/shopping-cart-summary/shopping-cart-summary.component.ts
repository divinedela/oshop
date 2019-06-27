import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  
  constructor() { }

  ngOnInit() {
  }

}
