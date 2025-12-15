import { Routes } from '@angular/router';
import {LoginPageComponent} from "./containers/login-page/login-page.component";
import {guestGuard} from "./guards/guest.guard";
import {ForgotPasswordPageComponent} from "./containers/forgot-password-page/forgot-password-page.component";
import {ResetPasswordPageComponent} from "./containers/reset-password-page/reset-password-page.component";
import {ActivatePageComponent} from "./containers/activate-page/activate-page.component";

export const authRoutes: Routes = [
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'auth/reset-password',
    component: ResetPasswordPageComponent,
  },
  {
    path: 'auth/activate-email',
    component: ActivatePageComponent,
  },
];
