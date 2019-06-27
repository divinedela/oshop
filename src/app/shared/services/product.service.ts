import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'shared/models/product.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  save(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any[]> {
      return this.db.list('/products').snapshotChanges().pipe(
        map(changes => 
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(key): Observable<any> {
    return this.db.object(`/products/${key}`).valueChanges();
  }

  update(product: Product) {
    return this.db.object(`/products/${product.key}`).update(product);
  }

  remove(key: string) {
    return this.db.object(`/products/${key}`).remove()
  }

}
