import {Component, inject, OnInit, output, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {LogoComponent} from "../logo/logo.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ThemeService} from "../../../core/theme/services/theme.service";
import {LocaleService} from "../../../core/locale/services/locale.service";
import {AuthService} from "../../../core/auth/services/auth.service";
import {Language} from '../../../core/locale/models/locale.model';
import {ConfigurationService} from '../../../core/configuration/services/configuration.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  imports: [
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
    MatIcon,
  ],
})
export class ToolbarComponent implements OnInit {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  localeService = inject(LocaleService);
  appCustomizationService = inject(ConfigurationService);

  menuStatus = output<boolean>();

  isMenuOpen = signal<boolean>(localStorage.getItem('isMenuOpen') !== 'false');

  ngOnInit() {
    this.menuStatus.emit(this.isMenuOpen());
  }

  logout(): void {
    this.authService.logout();
  }

  switchLanguage(currentLanguage: Language): void {
    this.localeService.switchLanguage(currentLanguage);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
    localStorage.setItem('isMenuOpen', this.isMenuOpen() ? 'true' : 'false');
    this.menuStatus.emit(this.isMenuOpen());
  }
}
