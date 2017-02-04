import { NgModule } from '@angular/core';

import { CollapseDirective } from 'ng2-bootstrap';
import { LocalStorageModule } from 'angular-2-local-storage';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthModule } from './auth/auth.module'
import { AccountsModule } from './accounts/accounts.module';
import { HomeModule } from './home/home.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';

import { AuthRouting } from './auth/auth.routing'
import { AccountsRouting } from './accounts/accounts.routing';
import { OrganizationsRouting } from './organizations/organizations.routing';
import { HomeRouting } from './home/home.routing';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    CollapseDirective
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'RelUp-idM',
      storageType: 'localStorage'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    AccountsModule,
    HomeModule,
    OrganizationsModule,
    SharedModule,
    AuthRouting,
    AccountsRouting,
    HomeRouting,
    OrganizationsRouting,
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
