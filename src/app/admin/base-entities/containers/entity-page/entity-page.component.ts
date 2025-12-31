import {Component, input} from '@angular/core';

import {TranslatePipe} from "@ngx-translate/core";
import {MatPrefix} from '@angular/material/input';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TabLink} from '../../models/tab-link';

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  imports: [
    TranslatePipe,
    MatPrefix,
    MatPrefix,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
  ]
})
export class EntityPageComponent {

  entityMetadata = input.required<{name: string, icon: string, route: string}>();
  entityName = input.required<string>();
  tabLinks = input< TabLink[]>([]);
  headerDisabled = input<boolean>(false);
}
