import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe((map(changes => changes.map(c => ({
      key: c.key, ...c.payload.val()
    })))));
  }
}
