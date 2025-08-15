import { Component, inject } from '@angular/core';
// import { Language } from '@rb/models';
import { Store } from '@ngrx/store';

import { user } from '../../../core/auth/store/auth.selectors';
import { instanceConfig } from '../../../core/config/store/config.selectors';
import { locale } from '../../../core/locale/store/locale.selectors';
import { AuthActions } from '../../../core/auth/store/action.types';
import { LocaleActions } from '../../../core/locale/store/action.types';
import { UiActions } from '../../../core/store/action.types';
import { isLightTheme } from '../../../core/store/ui.selectors';
import {RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {LogoComponent} from "../logo/logo.component";
import {TranslatePipe} from "@ngx-translate/core";
import {Language} from '../../models/locale.model';

@Component({
  selector: 'rb-toolbar',
  templateUrl: './toolbar.component.html',
  imports: [
    AsyncPipe,
    RouterLink,
    MatToolbar,
    MatToolbarRow,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatButton,
    LogoComponent,
    TranslatePipe,
  ],
})
export class ToolbarComponent {
  private store = inject(Store);

  config$ = this.store.select(instanceConfig);
  locale$ = this.store.select(locale);
  user$ = this.store.select(user);
  isLightTheme$ = this.store.select(isLightTheme);

  logout(): void {
    this.store.dispatch(AuthActions.logoutPasswordGrant());
  }

  switchLanguage(currentLanguage: Language): void {
    this.store.dispatch(LocaleActions.switchLanguage({ currentLanguage }));
  }

  toggleMenu(): void {
    this.store.dispatch(UiActions.toggleMenu());
  }

  toggleTheme() {
    this.store.dispatch(UiActions.toggleTheme());
  }
}
