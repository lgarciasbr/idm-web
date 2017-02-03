import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';

import { AccountsComponent } from './accounts.component';

import { AccountsService } from './accounts.service';
import { PreventUnsavedChangesGuard } from '../shared/prevent-unsaved-changes-guard.service';

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
        AccountsComponent
    ],
    exports: [
        AccountsComponent
    ],
    providers: [
        AccountsService,
        PreventUnsavedChangesGuard
    ]
})
export class AccountsModule {
}
