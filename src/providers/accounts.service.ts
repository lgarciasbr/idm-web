import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { LocalStorage } from '../app/shared/local.storage.service';

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

  GetItems(page?){
    return this._http.get(this._url + '?page=' + page + '&per_page=12', this.GetHeader())
      .map(res => res.json());
  }

  SearchItem(value?, page?){
    return this._http.get(this._url + 'search/?email=' + value + '&page=' + page + '&per_page=12', this.GetHeader())
      .map(res => res.json());
  }

  GetItem(item){
    return this._http.get(item._url, this.GetHeader())
      .map(res => res.json());
  }

  AddItem(item){
    return this._http.post(this._url, JSON.stringify(item), this.GetHeader())
      .map(res => res.json());
  }

  DeleteItem(item){
    return this._http.delete(item._url, this.GetHeader())
      .map(res => res.json());
  }

}
