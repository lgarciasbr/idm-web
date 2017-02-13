import { RouterModule } from '@angular/router';

import { CompanyComponent } from './company.component';

import { AuthGuard } from '../auth/auth.guard.service'

export const CompanyRouting = RouterModule.forChild([
    {
        path: 'company',
        canActivate: [AuthGuard],
        component: CompanyComponent
    }
]);
