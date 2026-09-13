import {Component, inject} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {AuthService} from '../../services/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  imports: [
    TranslatePipe,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,
  ],
})
export class AccountMenuComponent {
  protected readonly authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
