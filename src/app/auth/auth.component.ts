import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from "@angular/common/src/facade/async";

import { environment } from '../../environments/environment';

import { BasicValidators } from '../shared/basic.validators';
import { Account } from '../accounts/account'

import { LocalStorage } from '../shared/local.storage.service';

import { AuthService } from './auth.service'

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit, OnDestroy{
    projectWebName = environment.projectWebName;
    private form: FormGroup;
    private accountDetail = new Account();
    private myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
    public isLoginLoading = false;
    private sub;

    constructor(
        private fb: FormBuilder,
        private _storage: LocalStorage,
        private _router: Router,
        private _activeRoute: ActivatedRoute,
        private _auth: AuthService){
        this.form = fb.group({
            email: ['', BasicValidators.email],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.sub = this._activeRoute.params.subscribe(params => {
            if (params['action'] == 'logout')
                this.Logout();
        });

        this.myFocusTriggeringEventEmitter.emit(true);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    Login(){
        var token;

        this.isLoginLoading = true;

        this._auth.Login(this.accountDetail.email, this.accountDetail.password)
            .subscribe(
                data => token = data._token,
                response => {
                    this.isLoginLoading = false;
                    alert(JSON.parse(response._body).message);
                },
                () => {
                    this._storage.SetToken(token);
                    this._router.navigate(['']);
                    this.isLoginLoading = false;
                }
            );
    }

    Logout() {
        if (this._storage.IsLoggedIn()) {
            this._auth.Logout()
                .subscribe(
                    null,
                    response => {
                        if (response.status == 403) {
                            this._storage.DeleteToken();
                            this._router.navigate(['auth']);
                        }
                        else {
                            alert(JSON.parse(response._body).message);
                        }
                    },
                    () => {
                        this._storage.DeleteToken();
                        this._router.navigate(['auth']);
                    }
                )
        }
    }

}
