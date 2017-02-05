import { RouterModule  } from '@angular/router';
import { AuthComponent } from './auth.component';

export const AuthRouting = RouterModule.forChild([
    { path: 'auth',
      component: AuthComponent },
    { path: 'auth/:action',
      component: AuthComponent }
]);
