import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from "@angular/common/src/facade/async";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AccountsService } from '../../providers/accounts.service';
import { Account } from '../../providers/account'

import { BasicValidators } from '../shared/basic.validators';

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
    public form: FormGroup;
    public itemAddVisible = false;
    public itemDetailVisible = false;
    public itemVO = new Account();
    public itemsVO: any[];
    public pagesArray: any[];
    public pages;
    public page;
    myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
    public value = '';

    constructor(
        fb: FormBuilder,
        private _service: AccountsService,
        private _router: Router){

        this.form = fb.group({
            email: ['', BasicValidators.email],
            password: ['', Validators.required]
        });

        this.itemVO._avatar = "https://www.gravatar.com/avatar/?d=mm";
    }

    ngOnInit(){
        this.SearchItem();
        this.form.reset();
    }

    onKey(event: KeyboardEvent) {
        this.value = (<HTMLInputElement>event.target).value

        if (this.value.length == 0 || this.value.length >= 3) {
            this.SearchItem();
        }
    }

    SearchItem(page?) {
        this.itemDetailVisible = false;
        this.isLoadingVisible = true;

        // If some row was selected.
        this.selectedRow = null;

        var responseData;

        this._service.SearchItem(this.value, page)
            .debounceTime(1000)
            .distinctUntilChanged()
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
                    this.GridView(responseData);
                }
            )
    }

    GridView(responseData) {
        this.itemsVO = responseData.accounts;
        this.pages = responseData.pages.pages;
        this.page = responseData.pages.page;
        this.isLoadingVisible = false;
        this.itemVO = new Account();
        this.itemVO._avatar = "https://www.gravatar.com/avatar/?d=mm";

        if (this.pages > 3) {
            this.pagesArray = new Array(3);
            var maxPage;
            var minPage;

            if (this.page >= 2 && this.page + 1 <= this.pages)
                minPage = this.page - 1;
            else if (this.page + 1 >= this.pages)
                minPage = this.pages - 2;
            else
                minPage = 1;

            if (this.page < 2)
                maxPage = 3
            else if (this.page + 1 < this.pages)
                maxPage = this.page + 1;
            else
                maxPage = this.pages;

            for (var i = 0; i <= 3; i++) {
                if (minPage <= maxPage)
                    this.pagesArray[i] = minPage;

                minPage++;
            }
        }
        else {
            this.pagesArray = new Array(this.pages)

            for (var i = 1; i <= this.pages; i++) {
                this.pagesArray[i - 1] = i;
            }
        }
    }

    ShowAddItem(){
        // If some row was selected.
        this.selectedRow = null;
        this.itemVO = new Account();
        this.itemVO._avatar = "https://www.gravatar.com/avatar/?d=mm";
        this.form.reset();

        this.itemDetailVisible = false;
        this.itemAddVisible = true;

        this.myFocusTriggeringEventEmitter.emit(true);
    }

    SaveItem(){
        this.isLoadingVisible = true;

        this._service.AddItem(this.itemVO)
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
                    this.itemAddVisible = false;
                    this.isLoadingVisible = false;
                    this.SearchItem();
                });
    }

    CancelItem(){
        this.form.reset();
        this.itemAddVisible = false;
    }

    GetItem(account){
        this.isLoadingVisible = true;

        this.itemAddVisible = false;
        this.itemDetailVisible = true;

        this.selectedRow = this.itemsVO.indexOf(account);

        this._service.GetItem(account)
            .subscribe(
                data => this.itemVO = data.account,
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
                    this.itemVO._avatar = "https://www.gravatar.com/avatar/" + Md5.hashStr(this.itemVO.email.toLowerCase()) + "?d=mm";
                    this.isLoadingVisible = false;
                    window.location.hash ='DivDetails';
                }
            );
    }

    DeleteItem(item){
        if (item.email != null &&
            confirm("Are you sure you want to delete " + item.email + "?")) {
            this.isLoadingVisible = true;

            this._service.DeleteItem(item)
                .subscribe(null,
                    response => {
                        if (response.status == 404) {
                            this.isLoadingVisible = false;
                            alert("Could not delete.");
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
                        this.itemVO = new Account();
                        this.itemVO._avatar = "https://www.gravatar.com/avatar/?d=mm";
                        this.SearchItem(this.page);
                    }
                )
        }
    }

}
