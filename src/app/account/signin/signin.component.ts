import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { TokenService } from "../../core/shared/token.service";
import { Router } from "@angular/router";
import { auth } from "firebase";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    private router: Router
    ) {}

  ngOnInit() {}

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((user) => {
      this.router.navigate(["movies"]);
    });
  }
}
