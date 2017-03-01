import { RouterModule } from '@angular/router';
import { GroupsComponent } from './groups.component';

import { AuthGuard } from '../auth/auth.guard.service';

export const GroupsRouting = RouterModule.forChild([
    { path: 'groups',
      canActivate: [AuthGuard],
      component: GroupsComponent }
]);
