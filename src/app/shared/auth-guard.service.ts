import { Injectable } from '@angular/core';
import { LocalStorage } from './local_storage.service';
import { Router, CanActivate , CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private _storage: LocalStorage,
    private _router: Router
  ){
  }

  canActivate() {
    if (this._storage.IsLoggedIn()) {
      return true
    }
    else {
      this._router.navigate(['auth']);
    }

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this._router.navigate(['auth', state.url]);
    return true;
  }

}
