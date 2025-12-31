import {Component, inject, input} from '@angular/core';
import {PermissionDirective} from "../../../core/auth/directives/show-if-has-role.directive";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
} from "@angular/material/expansion";
import {TranslatePipe} from "@ngx-translate/core";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLinkExactActiveDirective} from "../../directives/router-link-exact-active.directive";
import {ConfigurationService} from '../../../core/configuration/services/configuration.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: 'sidebar-nav.component.html',
  imports: [
    MatExpansionPanel,
    MatTooltip,
    TranslatePipe,
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkExactActiveDirective,
    MatExpansionPanelHeader,
    PermissionDirective,
    MatIcon,
  ]
})
export class SidebarNavComponent {

  navGroupItems = inject(ConfigurationService).navGroupItems;

  isMenuOpen = input<boolean>(false);
}
