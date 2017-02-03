import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Http_Header } from '../shared/http_header.service';

@Injectable()
export class AuthService {
  private _url = "https://lgidm.herokuapp.com/auth/";

  constructor(
    private _http: Http,
    private _httpHeader: Http_Header
  ){
  }

  Login(email, password){
    var body  = JSON.stringify({'email': email, 'password': password});

    return this._http.post(this._url, body, this._httpHeader.Get())
      .map(
        res => res.json()
      );
  }

  Logout(){
    return this._http.delete(this._url, this._httpHeader.Get())
      .map(res => res.json()
      );
  }
}
