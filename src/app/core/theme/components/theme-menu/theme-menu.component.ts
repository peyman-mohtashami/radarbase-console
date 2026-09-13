import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  imports: [
    MatIcon,
    MatIconButton,
  ],
})
export class ThemeMenuComponent {
  protected readonly themeService = inject(ThemeService);
}
