import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";

import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {SidebarNavComponent} from "./shared/components/sidebar-nav/sidebar-nav.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    ToolbarComponent,
    FooterComponent,
    SidebarNavComponent,
    FormsModule,
  ],
})
export class AppComponent {
    isMenuOpened = true;
}
