import {Component, OnInit, viewChild} from '@angular/core';
import {ENTITY_NAME, ROLES} from '../../enums/entities';
import {ENTITIES} from '../../consts/entities';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import {Store} from '@ngrx/store';
import {isMenuOpen} from '../../../core/store/ui.selectors';
import {NgTemplateOutlet} from "@angular/common";
import {RbPermissionDirective} from "../../../core/auth/directives/ng-permission.directive";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
} from "@angular/material/expansion";
import {TranslatePipe} from "@ngx-translate/core";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLinkExactActiveDirective} from "../../directives/router-link-exact-active.directive";

export interface NavGroupItem {
  permission?: { role: string; entityName?: string }[];
  header?: { icon: string; name: string };
  expanded?: boolean;
  navList: {
    name: ENTITY_NAME;
    link: string;
    external?: boolean;
    permission?: { role: string; entityName?: string }[];
    exactMatch?: boolean;
  }[];
  close?: boolean;
}

@Component({
  selector: 'rb-sidebar-nav',
  templateUrl: 'sidebar-nav.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    RbPermissionDirective,
    MatExpansionPanel,
    MatTooltip,
    TranslatePipe,
    NgTemplateOutlet,
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkExactActiveDirective,
    MatExpansionPanelHeader,
  ]
})
export class SidebarNavComponent implements OnInit {
  protected readonly ENTITIES = ENTITIES;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  accordion = viewChild.required(MatAccordion);
  isMenuOpen = false;

  navGroupItems: NavGroupItem[] = [
    {
      close: false,
      header: {icon: 'workspaces', name: 'coreManagement'},
      navList: [
        {
          name: ENTITY_NAME.project,
          link: ENTITIES.project.route,
        },
        {
          name: ENTITY_NAME.organization,
          link: ENTITIES.organization.route,
        },
        {
          name: ENTITY_NAME.user,
          link: ENTITIES.user.route,
          permission: [{role: ROLES.SYS_ADMIN}],
        },
        {
          permission: [{role: ROLES.SYS_ADMIN}],
          name: ENTITY_NAME.appConfig,
          link: ENTITIES.appConfig.route,
        },
      ],
    },
    {
      permission: [{ role: ROLES.SYS_ADMIN }],
      close: true,
      header: {icon: 'tune', name: 'systemConfiguration'},
      navList: [
        {
          name: ENTITY_NAME.client,
          link: ENTITIES.client.route,
        },
        {
          name: ENTITY_NAME.sourceType,
          link: ENTITIES.sourceType.route,
        },
        {
          name: ENTITY_NAME.sourceData,
          link: ENTITIES.sourceData.route,
        },
        {
          name: ENTITY_NAME.audit,
          link: ENTITIES.audit.route,
          permission: [{role: ROLES.SYS_ADMIN}],
        },
        {
          name: ENTITY_NAME.revision,
          link: ENTITIES.revision.route,
          permission: [{role: ROLES.SYS_ADMIN}],
        },
      ],
    },
    {
      permission: [{role: ROLES.SYS_ADMIN}],
      close: true,
      header: {icon: 'monitor_heart', name: 'monitoring'},
      navList: [
        {
          name: ENTITY_NAME.health,
          link: ENTITIES.health.route,
          permission: [{role: ROLES.SYS_ADMIN}],
        },
        {
          name: ENTITY_NAME.metrics,
          link: ENTITIES.metrics.route,
          permission: [{role: ROLES.SYS_ADMIN}],
        },
        {
          name: ENTITY_NAME.log,
          link: ENTITIES.log.route,
          permission: [{role: ROLES.SYS_ADMIN}],
        },
        {
          name: ENTITY_NAME.systemLogs,
          link: ENTITIES.systemLogs.route,
          permission: [{role: ROLES.SYS_ADMIN}],
          external: true,
        },
        {
          name: ENTITY_NAME.systemStatus,
          link: ENTITIES.systemStatus.route,
          permission: [{role: ROLES.SYS_ADMIN}],
          external: true,
        },
      ],
    },
    {
      close: true,
      header: { icon: 'extension', name: 'externalLinks' },
      navList: [
        {
          name: ENTITY_NAME.uploadPortal,
          link: "#",
          external: true,
        },
        {
          name: ENTITY_NAME.dataStorage,
          link: "#",
          external: true,
        },
        {
          name: ENTITY_NAME.grafana,
          link: "#",
          external: true,
        },
      ],
    },
    {
      close: false,
      header: { icon: 'help', name: 'documentation' },
      navList: [
        {
          name: ENTITY_NAME.website,
          link: "https://radar-base.org",
          external: true,
        },
        {
          name: ENTITY_NAME.wiki,
          link: "https://radar-base.org",
          external: true,
        },
      ],
    },
  ];

  expandedElement = true;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(isMenuOpen).subscribe((isMenuOpen) => {
      this.isMenuOpen = isMenuOpen;
    });
  }
}
