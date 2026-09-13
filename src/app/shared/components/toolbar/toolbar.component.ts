import {Component} from '@angular/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {LogoComponent} from "../../../core/configuration/components/logo/logo.component";
import {AccountMenuComponent} from '../../../core/auth/components/account-menu/account-menu.component';
import {LanguagesMenuComponent} from '../../../core/locale/components/languages-menu/languages-menu.component';
import {ThemeMenuComponent} from '../../../core/theme/components/theme-menu/theme-menu.component';
import {SidebarTogglerComponent} from '../../../core/ui-state/sidebar-toggler/sidebar-toggler.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  imports: [
    MatToolbar,
    MatToolbarRow,
    LogoComponent,
    AccountMenuComponent,
    LanguagesMenuComponent,
    ThemeMenuComponent,
    SidebarTogglerComponent,
  ],
})
export class ToolbarComponent {
}
