import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from 'shared/models/AppUser';

@Injectable()
export class UserService {

  constructor(private afdb: AngularFireDatabase) { }

  update(user) {
    this.afdb.object(`/users/${user.uid}`).update({ 
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string) : Observable<AppUser> {
    return this.afdb.object(`/users/${uid}`).valueChanges()
      .pipe(map((user: AppUser) => user));
  }

  
}


