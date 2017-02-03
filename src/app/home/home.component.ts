import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
  page_title = 'Identity Manager';
  sub_title = '';
  loadingVisible = false;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ){
  }

  ngOnInit() {
    this._activeRoute.queryParams.subscribe(params => {
      if (params['r'] != null) {
        this._router.navigate([params['r']]);
      }
    });
  }
}
