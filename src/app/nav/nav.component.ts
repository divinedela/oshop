import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from "../models/AppUser";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  appUser: AppUser;

  constructor(private auth: AuthService) { 
    auth.AppUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
