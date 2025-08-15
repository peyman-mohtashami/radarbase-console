import { Routes } from '@angular/router';
// import {authGuard} from "./core/auth/guards/auth.guard";
import {LoginPageComponent} from "./containers/login-page/login-page.component";
import {guestGuard} from "./guards/guest.guard";
import {ForgotPasswordPageComponent} from "./containers/forgot-password-page/forgot-password-page.component";
import {ResetPasswordPageComponent} from "./containers/reset-password-page/reset-password-page.component";
import {ProfilePageComponent} from "./containers/profile-page/profile-page.component";
import {PasswordPageComponent} from "./containers/password-page/password-page.component";
import {ActivatePageComponent} from "./containers/activate-page/activate-page.component";
import {authGuard} from "./guards/auth.guard";

// export const appRoutes: Routes = [
//   {
//     path: 'admin',
//     loadChildren: () =>
//       import('./admin/admin.module').then((m) => m.AdminModule),
//     canActivate: [authGuard],
//   },
//   // {
//   //   path: 'admin',
//   //   loadChildren: () =>
//   //     import('./admin/admin.component').then((c) => c.AdminComponent),
//   //   canActivate: [authGuard],
//   // },
//   { path: '**', redirectTo: 'admin' },
// ];

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordPageComponent,
  },
  // {
  //   path: 'profile',
  //   component: ProfilePageComponent,
  //   canActivate: [authGuard],
  // },
  // {
  //   path: 'change-password',
  //   component: PasswordPageComponent,
  //   canActivate: [authGuard],
  // },
  {
    path: 'activate-email',
    component: ActivatePageComponent,
  },
  // { path: '**', redirectTo: 'admin'}, //APP_ROUTE.ADMIN },
];
