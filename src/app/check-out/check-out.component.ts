import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/ShoppingCart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
 
  constructor(
    private location: Location, 
    private cartService: ShoppingCartService
    ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  goBack() {
    this.location.back();
  }

}
