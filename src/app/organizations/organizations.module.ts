import { NgModule }     from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OrganizationsComponent } from './organizations.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        OrganizationsComponent
    ],
    exports: [
        OrganizationsComponent
    ],
    providers: [

    ]
})

export class OrganizationsModule {

}
