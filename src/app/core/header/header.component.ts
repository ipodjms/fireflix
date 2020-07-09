import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public show: boolean;
  constructor(public auth: AngularFireAuth, private router: Router) { }

  ngOnInit() { 
    this.auth.user;
  }

  logout() {
    this.auth.auth.signOut();
    this.router.navigate(["signin"]);
  }

}
