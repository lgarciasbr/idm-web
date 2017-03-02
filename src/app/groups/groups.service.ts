import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { LocalStorage } from '../shared/local.storage.service';

@Injectable()
export class GroupsService {
  private _url = "https://lgidm.herokuapp.com/groups/";

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

  getGroups(page?){
    return this._http.get(this._url + '?page=' + page + '&per_page=15', this.GetHeader())
      .map(res => res.json());
  }

  getGroup(account){
    return this._http.get(account._url, this.GetHeader())
      .map(res => res.json());
  }

  addGroup(account){
    return this._http.post(this._url, JSON.stringify(account), this.GetHeader())
      .map(res => res.json());
  }

  deleteGroup(account){
    return this._http.delete(account._url, this.GetHeader())
      .map(res => res.json());
  }

}
