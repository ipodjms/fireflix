import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private auth: AngularFireAuth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.verifyAccess();
  }

  verifyAccess() {
    return new Promise<boolean>((resolve) => {
      this.auth.user.subscribe((data: any) => {
        if (!data) {
          resolve(false);
          this.router.navigate(["signin"]);
        } else {
          resolve(true);
        }
      });
    });
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    // verificando se o usuario pode carregar o codigo do modulo
    return this.verifyAccess();
  }
}
