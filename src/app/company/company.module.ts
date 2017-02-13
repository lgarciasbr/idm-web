import { NgModule }     from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CompanyComponent } from './company.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        CompanyComponent
    ],
    exports: [
        CompanyComponent
    ],
    providers: [

    ]
})

export class CompanyModule {

}
