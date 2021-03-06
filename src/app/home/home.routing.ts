import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { AuthGuard } from '../auth/auth.guard.service';

export const HomeRouting = RouterModule.forChild([
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  }
]);
