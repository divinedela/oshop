import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { UserService } from './user.service';
import { AppUser } from "shared/models/AppUser";
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.user$ = afAuth.authState;
   }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        this.updateUser(res);
        this.router.navigateByUrl(returnUrl);
      })
      .catch(err => {
        alert(err);
      });
  }

  get AppUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) 
          return this.userService.get(user.uid);

          return of(null);
      }))
  }

  private updateUser(res: auth.UserCredential) {
    const picked = _.pick(res.user, ['uid', 'email', 'displayName']);
    this.userService.update(picked);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
