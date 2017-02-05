import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import {SharedModule} from '../shared/shared.module';

import { AuthComponent } from './auth.component'

import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})

export class AuthModule {

}
