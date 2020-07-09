import { Injectable, NgModule } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRoute,
} from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})

export class SigninGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth, private activatedRoute: ActivatedRoute) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAccess();
  }
  verifyAccess() {
    return new Promise<boolean>((resolve) => {
      this.auth.user.subscribe((data: any) => {
        if (!!data) {          
          resolve(false);
          let currentUrl = String (this.router.url);
          if (currentUrl.indexOf('movies/watch') === -1 ) {
            this.router.navigate(["movies"]);
          } else {
            resolve(true);  
          }          
        } else {
          resolve(true);
        }
      });
    });
  }
}
