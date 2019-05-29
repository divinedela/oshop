import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subcription: Subscription;

  constructor(productService: ProductService) { 
    this.subcription = productService.getAll()
      .subscribe(products => this.products = this.filteredProducts = products);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  filter(query: string) {
    console.log(this.filteredProducts);
    this.filteredProducts = (query.trim().length)? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

}
