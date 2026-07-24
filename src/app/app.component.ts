import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {SidebarNavComponent} from "./shared/components/sidebar-nav/sidebar-nav.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    FooterComponent,
    SidebarNavComponent,
  ],
})
export class AppComponent {
  isMenuOpened = true;
}
