import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { LocalStorage } from './local_storage.service';

@Injectable()
export class Http_Header {

  constructor(
    private _storage: LocalStorage
  ){}

  Get() {
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

}
