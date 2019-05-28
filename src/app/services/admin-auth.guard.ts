import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';;
import { AuthService } from './auth.service';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard  implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route, state): Observable<boolean> {
    return this.auth.AppUser$
      .pipe(map(appUser => {
        if(appUser.isAdmin) return true;

        this.router.navigate(['/no-access']);
        return false;
      }))
  }

}
