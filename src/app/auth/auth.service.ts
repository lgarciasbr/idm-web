import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { LocalStorage } from '../shared/local.storage.service';

@Injectable()
export class AuthService {
  private _url = "https://lgidm.herokuapp.com/auth/";

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

  Login(email, password){
    var body  = JSON.stringify({'email': email, 'password': password});

    return this._http.post(this._url, body, this.GetHeader())
      .map(
        res => res.json()
      );
  }

  Logout(){
    return this._http.delete(this._url, this.GetHeader())
      .map(res => res.json()
      );
  }
}
