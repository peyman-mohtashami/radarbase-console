import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {SidebarNavComponent} from "./shared/components/sidebar-nav/sidebar-nav.component";
import {MenuStateService} from './core/ui-state/menu-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    ToolbarComponent,
    FooterComponent,
    SidebarNavComponent,
  ],
})
export class AppComponent {
  protected readonly menuState = inject(MenuStateService);
}
