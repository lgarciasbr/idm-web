import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LocalStorage {

  constructor(
    private _storage: LocalStorageService
  ){}

  SetToken(token) {
      this._storage.set('token', token)
  }

  GetToken() {
      return this._storage.get('token')
  }

  DeleteToken() {
    this._storage.remove('token');
  }

  IsLoggedIn(){
    return this.GetToken() != null ? true : false;
  }

}
