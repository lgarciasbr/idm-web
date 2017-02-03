import {RouterModule} from '@angular/router'

import {NotFoundComponent} from './not-found.component';

export const AppRouting = RouterModule.forRoot([
    {
        path:'**',
        component:NotFoundComponent
    }
]);
