import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination.component';
import { PageHeaderComponent } from './page_header.component';

import {AuthGuard} from './auth-guard.service'
import {Http_Header} from './http_header.service'
import {LocalStorage} from './local_storage.service'
import {AlertService} from './alert.service'

import { FocusDirective } from './focus.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent,
    PageHeaderComponent,
    FocusDirective
  ],
  providers: [
    AuthGuard,
    Http_Header,
    LocalStorage,
    AlertService
  ],
  exports: [
    PaginationComponent,
    PageHeaderComponent,
    FocusDirective
  ]
})

export class SharedModule {

}
