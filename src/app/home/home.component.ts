import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
  title = 'Identity Manager';
  subTitle = 'Access the right resources.';
  isLoadingVisible = false;

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
