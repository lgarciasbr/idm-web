import { RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts.component';

import { AuthGuard } from '../auth/auth.guard.service';

export const AccountsRouting = RouterModule.forChild([
    { path: 'accounts',
      canActivate: [AuthGuard],
      component: AccountsComponent }
]);
