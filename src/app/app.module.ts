import { NgModule } from '@angular/core';

import { LocalStorageModule } from 'angular-2-local-storage';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthModule } from './auth/auth.module'
import { AccountsModule } from './accounts/accounts.module';
import { GroupsModule } from './groups/groups.module';
import { HomeModule } from './home/home.module';
import { CompanyModule } from './company/company.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';

import { AuthRouting } from './auth/auth.routing'
import { AccountsRouting } from './accounts/accounts.routing';
import { GroupsRouting } from './groups/groups.routing';
import { CompanyRouting } from './company/company.routing';
import { HomeRouting } from './home/home.routing';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'idM',
      storageType: 'localStorage'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    AccountsModule,
    GroupsModule,
    HomeModule,
    CompanyModule,
    SharedModule,
    AuthRouting,
    AccountsRouting,
    GroupsRouting,
    HomeRouting,
    CompanyRouting,
    AppRouting
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {

}
