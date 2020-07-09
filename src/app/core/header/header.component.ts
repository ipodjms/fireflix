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

  public logout(): void {
    this.auth.auth.signOut();
    this.router.navigate(["signin"]);
  }

  public goToProfiles(): void {
    this.router.navigate(["profiles"]);
  }

}
