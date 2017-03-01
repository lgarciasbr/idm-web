import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';

import { GroupsComponent } from './groups.component';

import { GroupsService } from './groups.service';

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
        GroupsComponent
    ],
    exports: [
        GroupsComponent
    ],
    providers: [
        GroupsService
    ]
})

export class GroupsModule {
}
