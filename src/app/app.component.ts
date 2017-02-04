import { Component, OnInit } from '@angular/core';

import { environment } from '../environments/environment';

import { LocalStorage } from './shared/local_storage.service';
import { AlertService } from './shared/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
  navbarVisible;
  public isCollapsed: boolean = true;
  project_web_name = environment.project_web_name;
  message;

  constructor(
    private _storage: LocalStorage,
    private alertService: AlertService
  ){
  }

   ngOnInit(){
     this.navbarVisible = this._storage.IsLoggedIn();

     this.alertService.getMessage().subscribe(
       message => {
         this.message = message;
         this.navbarVisible = this._storage.IsLoggedIn() ? true : false;
       }
     )
  }

}
