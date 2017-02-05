import {RouterModule} from '@angular/router'

import {NotFoundComponent} from './not-found.component';

import { AuthGuard } from './auth/auth.guard.service'

export const AppRouting = RouterModule.forRoot([
    {
        path:'**',
        canActivate: [AuthGuard],
        component:NotFoundComponent
    }
]);
