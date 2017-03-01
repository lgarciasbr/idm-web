"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var UsersService = (function () {
    function UsersService(_http) {
        this._http = _http;
        // let authToken = localStorage.getItem('auth_token');
        // private _url = "http://127.0.0.1:5000/accounts/";
        // https://lgidm.herokuapp.com/accounts/?page=1&per_page=10
        this._url = "https://lgidm.herokuapp.com/accounts/";
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'ver': '1',
            'token': 'eyJpYXQiOjE0ODUyMTY4NzMsImV4cCI6MTQ4NTIyMDQ3MywiYWxnIjoiSFMyNTYifQ.Mzc._53c9mkUhGo5pD7cVjQ5omJU3BMtE8cN0Fp3-Vm6Dz8'
        });
        this.options = new http_1.RequestOptions({
            headers: this.headers
        });
    }
    UsersService.prototype.getUsers = function (page) {
        return this._http.get(this._url + '?page=' + page + '&per_page=15', this.options)
            .map(function (res) { return res.json(); });
    };
    UsersService.prototype.getUser = function (account) {
        return this._http.get(account._url, this.options)
            .map(function (res) { return res.json(); });
    };
    UsersService.prototype.addUser = function (account) {
        return this._http.post(this._url, JSON.stringify(account), this.options)
            .map(function (res) { return res.json(); });
    };
    UsersService.prototype.deleteUser = function (account) {
        return this._http.delete(account._url, this.options)
            .map(function (res) { return res.json(); });
    };
    UsersService = __decorate([
        core_1.Injectable()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
