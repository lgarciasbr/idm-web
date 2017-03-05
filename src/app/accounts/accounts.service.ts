import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { LocalStorage } from '../shared/local.storage.service';

@Injectable()
export class AccountsService {
  private _url = "https://lgidm.herokuapp.com/accounts/";

  constructor(
    private _http: Http,
    private _storage: LocalStorage){
  }

  GetHeader() {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'ver': '1',
      'token': this._storage.GetToken()
    });

    var options = new RequestOptions({
      headers: headers
    });

    return options
  }

  getUsers(page?){
    return this._http.get(this._url + '?page=' + page + '&per_page=12', this.GetHeader())
      .map(res => res.json());
  }

  getUser(account){
    return this._http.get(account._url, this.GetHeader())
      .map(res => res.json());
  }

  addUser(account){
    return this._http.post(this._url, JSON.stringify(account), this.GetHeader())
      .map(res => res.json());
  }

  deleteUser(account){
    return this._http.delete(account._url, this.GetHeader())
      .map(res => res.json());
  }

}
