import { Routes } from '@angular/router';
import {authGuard} from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.adminRoutes),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'admin' },
];
