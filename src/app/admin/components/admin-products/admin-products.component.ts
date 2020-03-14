import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product.model';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  items: Product[] = [];
  itemCount: number;
  tableResource: DataTableResource<Product>
  subcription: Subscription;

  constructor(productService: ProductService) { 
    this.subcription = productService.getAll()
      .subscribe(products => { 
        this.products = products;
        this.initializeTable(products);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  private initializeTable(products: any[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  filter(query: string) {
    const filteredProducts = (query.trim().length)? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  reload(params) {
    if (!params) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

}