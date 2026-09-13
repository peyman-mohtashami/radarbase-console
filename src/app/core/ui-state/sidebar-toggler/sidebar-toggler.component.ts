import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MenuStateService} from '../menu-state.service';

@Component({
  selector: 'app-sidebar-toggler',
  templateUrl: './sidebar-toggler.component.html',
  imports: [
    MatIcon,
    MatIconButton,
  ],
})
export class SidebarTogglerComponent {
  protected readonly menuState = inject(MenuStateService);
}
