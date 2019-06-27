import { Component, Input } from '@angular/core';
import { CategoryService } from 'app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
   }

}
