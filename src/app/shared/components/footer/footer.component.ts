import {Component, input} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
// import {MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
// import {MatListItem, MatNavList} from "@angular/material/list";
// import {NgTemplateOutlet} from "@angular/common";
// import {RbPermissionDirective} from "../../../core/auth/role/directives/ng-permission.directive";
// import {RouterLinkExactActiveDirective} from "../../../admin/directives/router-link-exact-active.directive";
// import {ENTITY_NAME} from "../../../admin/enums/entities";
// import {NavGroupItem} from "../../../admin/components/sidebar-nav/sidebar-nav.component";
// import {ENTITIES} from "../../../admin/consts/entities";
// import {MatTooltip} from "@angular/material/tooltip";
// import {RouterLink} from "@angular/router";

@Component({
  selector: 'rb-footer',
  templateUrl: './footer.component.html',
  imports: [
    TranslatePipe,
    // MatExpansionPanel,
    // MatExpansionPanelHeader,
    // MatListItem,
    // MatNavList,
    // NgTemplateOutlet,
    // RbPermissionDirective,
    // RouterLinkExactActiveDirective,
    // MatTooltip,
    // RouterLink,
  ],
})
export class FooterComponent {
  isMenuOpen = input<boolean>(true)

  //TODO Add dynamic version
  //
  // navGroupItems: NavGroupItem[] = [
  //   {
  //     close: false,
  //     header: { icon: 'help', name: 'documentation' },
  //     navList: [
  //       {
  //         name: ENTITY_NAME.website,
  //         link: "https://radar-base.org",
  //         external: true,
  //       },
  //       {
  //         name: ENTITY_NAME.wiki,
  //         link: "https://radar-base.org",
  //         external: true,
  //       },
  //     ],
  //   },
  // ];
  //
  // expandedElement = true;
  // protected readonly ENTITIES = ENTITIES;
}
