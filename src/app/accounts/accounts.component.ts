import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import any = jasmine.any;
import {EventEmitter} from "@angular/common/src/facade/async";

import { AccountsService } from './accounts.service';

import { BasicValidators } from '../shared/basicValidators';
import { Account } from './account'

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html'
})

export class AccountsComponent implements OnInit{
  page_title = 'Account';
  sub_title = 'Manage your accounts.';
  loadingVisible = false;
  selectedRow = null;
  form: FormGroup;
  accountAddVisible = false;
  accountDetailVisible = true;
  accountDetail = new Account();
  accounts: any[];
  myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

  constructor(
    fb: FormBuilder,
    private _service: AccountsService,
    private _router: Router
  ){
    this.form = fb.group({
      email: ['', BasicValidators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getUsers()
    this.form.reset();
  }

  ShowAddAccount(){
    // If some row was selected.
    this.selectedRow = null;
    this.accountDetail = new Account();
    this.form.reset();

    this.accountDetailVisible = false;
    this.accountAddVisible = true;

    this.myFocusTriggeringEventEmitter.emit(true);
  }

  Save(){
    this.loadingVisible = true;

    this._service.addUser(this.accountDetail)
      .subscribe(
        null,
        response => {
          if (response.status == 403) {
            this.loadingVisible = false;
            this._router.navigate(['auth', 'logout']);
          }
          else if (response.status == 500 || response.status == 400)
          {
            this.loadingVisible = false;
            alert(JSON.parse(response._body).message);
          }
        },
        () => {
          this.form.reset();
          this.accountAddVisible = false;
          this.accountDetailVisible = true;
          this.loadingVisible = false;
          this.getUsers();
        });
  }

  Cancel(){
    this.form.reset();
    this.accountAddVisible = false;
    this.accountDetailVisible = true;
  }

  getUsers(page?){
    this.loadingVisible = true;

    // If some row was selected.
    this.selectedRow = null;

    this._service.getUsers(page)
      .subscribe(
        data => this.accounts = data.accounts,
        response => {
          if (response.status == 403) {
            this.loadingVisible = false;
            this._router.navigate(['auth', 'logout']);
          }
          else if (response.status == 500 || response.status == 400)
          {
            this.loadingVisible = false;
            alert(JSON.parse(response._body).message);
          }
        },
        () => {
          this.loadingVisible = false;
        }
      );
  }

  getUser(account){
    this.loadingVisible = true;

    this.accountAddVisible = false;
    this.accountDetailVisible = true;

    this.selectedRow = this.accounts.indexOf(account);

    this._service.getUser(account)
      .subscribe(
        data => this.accountDetail = data.account,
        response => {
          if (response.status == 404) {
            this.loadingVisible = false;
            alert("Account not found.");
          }
          else if (response.status == 403) {
            this.loadingVisible = false;
            this._router.navigate(['auth', 'logout']);
          }
          else
          {
            this.loadingVisible = false;
            alert(JSON.parse(response._body).message);
          }
        },
        () => {
          this.loadingVisible = false;
          window.location.hash ='DivDetails';
        }
      );
  }

  deleteUser(accountDetail){
    if (accountDetail.email != null &&
      confirm("Are you sure you want to delete " + accountDetail.email + "?")) {

      this.loadingVisible = true;

      this._service.deleteUser(accountDetail)
        .subscribe(null,
          response => {
            if (response.status == 404) {
              this.loadingVisible = false;
              alert("Could not delete the account.");
            }
            else if (response.status == 403) {
              this.loadingVisible = false;
              this._router.navigate(['auth', 'logout']);
            }
            else
            {
              this.loadingVisible = false;
              alert(JSON.parse(response._body).message);
            }
          },
          () => {
            this.loadingVisible = false;
            this.accountDetail = new Account();
            this.getUsers();
          }
        )
    }
  }

}
