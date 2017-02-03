import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Http_Header } from '../shared/http_header.service'

@Injectable()
export class AccountsService {
  private _url = "https://lgidm.herokuapp.com/accounts/";

  constructor(
    private _http: Http,
    private _httpHeader: Http_Header
  ){

  }

  getUsers(page?){
    return this._http.get(this._url + '?page=' + page + '&per_page=15', this._httpHeader.Get())
      .map(res => res.json());
  }

  getUser(account){
    return this._http.get(account._url, this._httpHeader.Get())
      .map(res => res.json());
  }

  addUser(account){
    return this._http.post(this._url, JSON.stringify(account), this._httpHeader.Get())
      .map(res => res.json());
  }

  deleteUser(account){
    return this._http.delete(account._url, this._httpHeader.Get())
      .map(res => res.json());
  }

}
