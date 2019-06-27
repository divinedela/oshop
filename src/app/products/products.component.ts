import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product.model';
import { switchMap } from "rxjs/operators";
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories$;
  filteredProducts: Product[] = [];
  category: string;
  products: Product[] = [];
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
    ) { }
  
   async ngOnInit() {
    this.populateProducts();
    this.cart$ = (await this.cartService.getCart());
  }

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(products => {
      this.products = this.filteredProducts = products;
      return this.route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category');
      this.filterProductsByCategory();
    });
  }

  private filterProductsByCategory() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category == this.category) :
      this.products;
  }

}
