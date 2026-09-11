import {Component, computed, inject, input} from '@angular/core';
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
import {CustomConfiguration} from '../../../core/configuration/models/deployment-configuration.model';
import {NavGroupItem} from '../../../core/configuration/models/nav-group-item.model';
import {ROLES} from '../../enums/roles';
import {ENTITY_REGISTRY, EntityRegistry} from '../../consts/entity-registry';

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

  mainNavigationCustomization = inject(ConfigurationService).customNavigation;
  navGroupItems = computed(() => this.setNavGroupItems(this.mainNavigationCustomization()));

  isMenuOpen = input<boolean>(false);

  private setNavGroupItems(config: CustomConfiguration['mainNavigation']) {
    const navGroupItems: NavGroupItem[] = [
      {
        permission: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN}, {role: ROLES.PROJECT_ADMIN}],
        close: false,
        header: {icon: 'workspaces', name: 'coreManagement'},
        navList: [
          ENTITY_REGISTRY.project,
          ENTITY_REGISTRY.organization,
          ENTITY_REGISTRY.user
        ],
      },
      {
        permission: [{role: ROLES.SYS_ADMIN}],
        close: false,
        header: {icon: 'tune', name: 'systemConfiguration'},
        navList: ([
          ENTITY_REGISTRY.client,
          ENTITY_REGISTRY.sourceType,
          ENTITY_REGISTRY.sourceData,
          ENTITY_REGISTRY.appConfig,
          enabled(config.internal.questionnaire, ENTITY_REGISTRY.questionnaire),
          enabled(config.internal.audit, ENTITY_REGISTRY.audit),
          enabled(config.internal.revision, ENTITY_REGISTRY.revision),
        ]).filter(item => !!item),
      },
      {
        permission: [{role: ROLES.SYS_ADMIN}],
        close: true,
        header: {icon: 'monitor_heart', name: 'monitoring'},
        navList: ([
          enabled(config.internal.health, ENTITY_REGISTRY.health),
          enabled(config.internal.metrics, ENTITY_REGISTRY.metrics),
          enabled(config.internal.log, ENTITY_REGISTRY.log),
          enabled(config.external.systemLogs, ENTITY_REGISTRY.systemLogs),
          enabled(config.external.systemStatus, ENTITY_REGISTRY.systemStatus),
        ]).filter(item => !!item),
      },
      {
        close: true,
        header: {icon: 'extension', name: 'externalLinks'},
        navList: ([
          enabled(config.external.uploadPortal, ENTITY_REGISTRY.uploadPortal),
          enabled(config.external.dataStorage, ENTITY_REGISTRY.dataStorage),
          enabled(config.external.grafana, ENTITY_REGISTRY.grafana),
        ]).filter(item => !!item),
      },
      {
        close: false,
        header: {icon: 'help', name: 'documentation'},
        navList: ([
          enabled(config.external.website, ENTITY_REGISTRY.website),
          enabled(config.external.wiki, ENTITY_REGISTRY.wiki),
        ]).filter(item => !!item),
      },
    ];
    return navGroupItems;
  }
}


const enabled = (config: boolean | undefined | { url: string }, item: EntityRegistry) => {
  if (config === undefined || config === true) return item;
  if (config === false) return undefined;
  if (config.url) return {...item, external: true, route: config.url};
  return item;
}
