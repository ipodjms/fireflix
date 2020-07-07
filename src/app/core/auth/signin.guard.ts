import { Injectable, NgModule } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { AngularFireAuth } from "@angular/fire/auth";
import { first, tap } from "rxjs/operators";
import { promise } from "protractor";

@Injectable({
  providedIn: "root",
})
@NgModule({
  providers: [AngularFireAuth],
})
export class SigninGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log("guarda de sign in");
    return this.verifyAccess();
  }
  verifyAccess() {
    return new Promise<boolean>((resolve) => {
      this.auth.user.subscribe((data: any) => {
        if (!!data) {
          resolve(false);
          this.router.navigate(["movies"]);
        } else {
          resolve(true);
        }
      });
    });
  }
}
