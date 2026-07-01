import {Component, inject, input} from '@angular/core';
import {PermissionDirective} from "../../../core/auth/directives/show-if-has-role.directive";
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
} from "@angular/material/expansion";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLinkExactActiveDirective} from "../../directives/router-link-exact-active.directive";
import {ConfigurationService} from '../../../core/configuration/services/configuration.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: 'sidebar-nav.component.html',
  imports: [
    MatExpansionPanel,
    MatTooltip,
    TranslatePipe,
    RouterLink,
    RouterLinkExactActiveDirective,
    MatExpansionPanelHeader,
    PermissionDirective,
    MatIcon,
    MatButton,
  ],
  styles: `
    :host {
      --mat-expansion-container-shape: 4px;
      --mat-expansion-container-text-line-height: var(--text-sm--line-height);
      --mat-expansion-container-text-size: var(---text-sm);
      --mat-expansion-container-text-tracking: var(--text-sm--tracking);
      --mat-expansion-header-text-line-height: var(--text-sm--line-height);
      --mat-expansion-header-text-size: var(--text-sm);
      --mat-expansion-header-text-tracking: var(--text-sm--tracking);
      --mat-expansion-header-indicator-color: var(--mat-sys-on-tertiary);
      //--mat-expansion-container-background-color: transparent;//var(--mat-sys-surface),
      //--mat-expansion-header-hover-state-layer-color: color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent),
      --mat-expansion-container-text-color: var(--mat-sys-on-tertiary);
      --mat-expansion-header-text-color: var(--mat-sys-on-tertiary);
      --mat-expansion-header-collapsed-state-height: 40px;
      --mat-expansion-header-expanded-state-height: 40px;
    }
    :host ::ng-deep .mat-expansion-panel-body {
      padding: 0;
    }
  `
})
export class SidebarNavComponent {

  navGroupItems = inject(ConfigurationService).navGroupItems;

  isMenuOpen = input<boolean>(false);
}
