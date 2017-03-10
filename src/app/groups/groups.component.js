"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var users_service_1 = require('./users.service');
var user_1 = require('./user');
var UsersComponent = (function () {
    function UsersComponent(_service, _router, _usersService) {
        this._service = _service;
        this._router = _router;
        this._usersService = _usersService;
        this.page_title = 'Account Management';
        this.accountDetail = new user_1.User();
        this.index = 0;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.getUsers = function (page) {
        var _this = this;
        this.loading = true;
        this._service.getUsers(page)
            .subscribe(function (data) { return _this.accounts = data.itemsVO; }, null, function () { _this.loading = false; });
    };
    UsersComponent.prototype.getUser = function (account) {
        var _this = this;
        this.loading = true;
        this.index = this.accounts.indexOf(account);
        this._usersService.GetItem(account)
            .subscribe(function (data) { return _this.accountDetail = data.account; }, function (response) {
            if (response.status == 404) {
                _this._router.navigate(['NotFound']);
            }
        }, function () { _this.loading = false; });
    };
    UsersComponent.prototype.deleteUser = function (accountDetail) {
        var _this = this;
        if (accountDetail.email != null && confirm("Are you sure you want to delete " + accountDetail.email + "?")) {
            this._service.DeleteItem(accountDetail)
                .subscribe(null, function (err) {
                alert("Could not delete the user.");
            },
            // var index = this.itemsVO.indexOf(accountDetail)
            // Here, with the splice method, we remove 1 object
            // at the given index.
            function () {
                _this.accounts.splice(_this.index, 1);
            });
            this.accountDetail = new user_1.User;
        }
    };
    UsersComponent.prototype.AccountAdded = function () {
        this.getUsers();
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'users',
            templateUrl: './users.component.html',
            providers: [users_service_1.UsersService]
        })
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
