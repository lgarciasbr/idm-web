import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollapseDirective } from 'ng2-bootstrap';

import { PageNavbarComponent } from './page.navbar.component';
import { PageTitleComponent } from './page.title.component';

import { LocalStorage } from './local.storage.service'

import { FocusDirective } from './focus.directive'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    CollapseDirective,
    PageNavbarComponent,
    PageTitleComponent,
    FocusDirective
  ],
  providers: [
    LocalStorage
  ],
  exports: [
    PageNavbarComponent,
    PageTitleComponent,
    FocusDirective
  ]
})

export class SharedModule {

}
