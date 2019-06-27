import { Component, OnInit } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {title: '', price: 0, category: '', imageUrl: ''};
  categories$;
  id: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location
    ) { 
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) this.getProduct(this.id);

      this.categories$ = this.categoryService.getAll();
    }

  ngOnInit() {
    
  }

  private getProduct(id: string) {
    this.productService.get(id).pipe(take(1))
      .subscribe((product : Product) => {
        this.product = product;
      });
  }

  save() {
    if (this.id)
      this.productService.update(this.product);
    else 
      this.productService.save(this.product);
    
    this.router.navigate(['/admin/products']);
  }

  delete() {
    const shouldDelete = confirm('Are you sure you want to delete this product?');
    if (!shouldDelete) return;

    this.productService.remove(this.product.key);
    this.router.navigate(['/admin/products']);
  }

  goBack() {
    this.location.back();
  }

}
