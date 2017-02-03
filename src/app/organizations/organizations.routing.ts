import { RouterModule } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';

import { AuthGuard } from '../shared/auth-guard.service'

export const OrganizationsRouting = RouterModule.forChild([
    {
        path: 'organizations',
        canActivate: [AuthGuard],
        component: OrganizationsComponent
    }
]);
