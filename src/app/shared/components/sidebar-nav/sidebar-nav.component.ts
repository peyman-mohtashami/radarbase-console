import {Component, input} from '@angular/core';
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
import {ROLES} from "../../enums/roles";
import {ENTITY_REGISTRY} from "../../consts/entity-registry";

export interface NavGroupItem {
  permission?: { role: string; entityName?: string }[];
  header?: { icon: string; name: string };
  expanded?: boolean;
  navList: {
    name: string;
    icon: string;
    route?: string;
    external?: boolean;
    permission?: { role: string; entityName?: string }[];
    exactMatch?: boolean;
  }[];
  close?: boolean;
}

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
  ]
})
export class SidebarNavComponent {

  isMenuOpen = input<boolean>(false);

  navGroupItems: NavGroupItem[] = [
    // {
    //   permission: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN}, {role: ROLES.PROJECT_ADMIN}],
    //   close: false,
    //   header: {icon: 'workspaces', name: 'coreManagement'},
    //   navList: [
    //     ENTITY_REGISTRY.project,
    //     ENTITY_REGISTRY.organization,
    //     ENTITY_REGISTRY.user
    //   ],
    // },
    {
      permission: [{role: ROLES.SYS_ADMIN}],
      close: false,
      header: {icon: 'tune', name: 'systemConfiguration'},
      navList: [
        // ENTITY_REGISTRY.client,
        // ENTITY_REGISTRY.sourceType,
        // ENTITY_REGISTRY.sourceData,
        // ENTITY_REGISTRY.appConfig,
        ENTITY_REGISTRY.protocol,
        ENTITY_REGISTRY.questionnaire,
        // ENTITY_REGISTRY.audit,
        // ENTITY_REGISTRY.revision,
      ],
    },
    // {
    //   permission: [{role: ROLES.SYS_ADMIN}],
    //   close: true,
    //   header: {icon: 'monitor_heart', name: 'monitoring'},
    //   navList: [
    //     ENTITY_REGISTRY.health,
    //     ENTITY_REGISTRY.metrics,
    //     ENTITY_REGISTRY.log,
    //     ENTITY_REGISTRY.systemLogs,
    //     ENTITY_REGISTRY.systemStatus,
    //   ],
    // },
    // {
    //   close: true,
    //   header: {icon: 'extension', name: 'externalLinks'},
    //   navList: [
    //     ENTITY_REGISTRY.uploadPortal,
    //     ENTITY_REGISTRY.dataStorage,
    //     ENTITY_REGISTRY.grafana,
    //   ],
    // },
    {
      close: false,
      header: {icon: 'help', name: 'documentation'},
      navList: [
        ENTITY_REGISTRY.website,
        ENTITY_REGISTRY.wiki,
      ],
    },
  ];
}
