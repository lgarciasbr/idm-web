import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from "@angular/common/src/facade/async";

import { AccountsService } from './accounts.service';

import { BasicValidators } from '../shared/basic.validators';
import { Account } from './account'

import any = jasmine.any;

@Component({
    selector: 'accounts',
    templateUrl: './accounts.component.html'
})

export class AccountsComponent implements OnInit{
    public title = 'Account';
    public subTitle = 'Manage your accounts.';
    public isLoadingVisible = false;
    public selectedRow = null;
    form: FormGroup;
    accountAddVisible = false;
    accountDetailVisible = false;
    accountDetail = new Account();
    public accounts: any[];
    public pagesArray: any[];
    public pages;
    public page;
    myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

    constructor(
        fb: FormBuilder,
        private _service: AccountsService,
        private _router: Router){
        this.form = fb.group({
            email: ['', BasicValidators.email],
            password: ['', Validators.required]
        });

        this.accountDetail._avatar = "https://www.gravatar.com/avatar/?d=mm";
    }

    ngOnInit(){
        this.getUsers()
        this.form.reset();
    }

    ShowAddAccount(){
        // If some row was selected.
        this.selectedRow = null;
        this.accountDetail = new Account();
        this.accountDetail._avatar = "https://www.gravatar.com/avatar/?d=mm";
        this.form.reset();

        this.accountDetailVisible = false;
        this.accountAddVisible = true;

        this.myFocusTriggeringEventEmitter.emit(true);
    }

    Save(){
        this.isLoadingVisible = true;

        this._service.addUser(this.accountDetail)
            .subscribe(
                null,
                response => {
                    if (response.status == 403) {
                        this.isLoadingVisible = false;
                        this._router.navigate(['auth', 'logout']);
                    }
                    else if (response.status == 500 || response.status == 400) {
                        this.isLoadingVisible = false;
                        alert(JSON.parse(response._body).message);
                    }
                },
                () => {
                    this.form.reset();
                    this.accountAddVisible = false;
                    // this.accountDetailVisible = true;
                    this.isLoadingVisible = false;
                    this.getUsers();
                });
    }

    Cancel(){
        this.form.reset();
        this.accountAddVisible = false;
        // this.accountDetailVisible = true;
    }

    getUsers(page?){
        this.accountDetailVisible = false;
        this.isLoadingVisible = true;

        // If some row was selected.
        this.selectedRow = null;

        var responseData;

        this._service.getUsers(page)
            .subscribe(
                data => responseData = data,
                response => {
                    if (response.status == 403) {
                        this.isLoadingVisible = false;
                        this._router.navigate(['auth', 'logout']);
                    }
                    else if (response.status == 500 || response.status == 400) {
                        this.isLoadingVisible = false;
                        alert(JSON.parse(response._body).message);
                    }
                },
                () => {
                    this.accounts = responseData.accounts;
                    this.pages = responseData.pages.pages;
                    this.page = responseData.pages.page;
                    this.isLoadingVisible = false;
                    this.accountDetail = new Account();
                    this.accountDetail._avatar = "https://www.gravatar.com/avatar/?d=mm";

                    if (this.pages > 5){
                        this.pagesArray = new Array(5);
                        var maxPage;
                        var minPage;

                        if (this.page >= 4 && this.page + 2 <= this.pages)
                            minPage = this.page - 2;
                        else if (this.page + 2 >= this.pages)
                            minPage = this.pages - 4;
                        else
                            minPage = 1;

                        if (this.page < 4)
                            maxPage = 5
                        else if (this.page + 2 < this.pages)
                            maxPage = this.page + 2;
                        else
                            maxPage = this.pages;

                        for (var i = 0; i <= 5; i++) {
                            if (minPage <= maxPage)
                                this.pagesArray[i] = minPage;

                            minPage++;
                        }
                    }
                    else {
                        this.pagesArray = new Array(this.pages)

                        for (var i = 1; i <= this.pages; i++) {
                            this.pagesArray[i-1] = i;
                        }
                    }
                }
            );
    }

    getUser(account){
        this.isLoadingVisible = true;

        this.accountAddVisible = false;
        this.accountDetailVisible = true;

        this.selectedRow = this.accounts.indexOf(account);

        this._service.getUser(account)
            .subscribe(
                data => this.accountDetail = data.account,
                response => {
                    if (response.status == 404) {
                        this.isLoadingVisible = false;
                        alert("Account not found.");
                    }
                    else if (response.status == 403) {
                        this.isLoadingVisible = false;
                        this._router.navigate(['auth', 'logout']);
                    }
                    else {
                        this.isLoadingVisible = false;
                        alert(JSON.parse(response._body).message);
                    }
                },
                () => {
                    this.accountDetail._avatar = "https://www.gravatar.com/avatar/" + Md5.hashStr(this.accountDetail.email.toLowerCase()) + "?d=mm";
                    this.isLoadingVisible = false;
                    window.location.hash ='DivDetails';
                }
            );
    }

    deleteUser(accountDetail){
        if (accountDetail.email != null &&
            confirm("Are you sure you want to delete " + accountDetail.email + "?")) {
            this.isLoadingVisible = true;

            this._service.deleteUser(accountDetail)
                .subscribe(null,
                    response => {
                        if (response.status == 404) {
                            this.isLoadingVisible = false;
                            alert("Could not delete the account.");
                        }
                        else if (response.status == 403) {
                            this.isLoadingVisible = false;
                            this._router.navigate(['auth', 'logout']);
                        }
                        else
                        {
                            this.isLoadingVisible = false;
                            alert(JSON.parse(response._body).message);
                        }
                    },
                    () => {
                        this.isLoadingVisible = false;
                        this.accountDetail = new Account();
                        this.accountDetail._avatar = "https://www.gravatar.com/avatar/?d=mm";
                        this.getUsers();
                    }
                )
        }
    }

}
