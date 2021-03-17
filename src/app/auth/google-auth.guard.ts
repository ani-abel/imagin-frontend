import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { checkTokenExpiration } from "../utils/shared.functions";

@Injectable({
  providedIn: "root",
})
export class GoogleGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const googleAuthCheck: boolean = checkTokenExpiration();
    if (!googleAuthCheck) {
      this.router.navigate(["/"]);
    }
    return googleAuthCheck;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const googleAuthCheck: boolean = checkTokenExpiration();
    if (!googleAuthCheck) {
      this.router.navigate(["/"]);
    }
    return googleAuthCheck;
  }
}