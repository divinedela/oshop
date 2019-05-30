import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { switchMap } from "rxjs/operators";

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

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute
    ) {
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = this.filteredProducts = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filterProductsByCategory();
    });
    
   }
  
  ngOnInit() {}

  private filterProductsByCategory() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category == this.category) :
      this.products;
  }

}
