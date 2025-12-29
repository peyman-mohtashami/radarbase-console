import {Component, inject, input, OnDestroy, OnInit, signal} from '@angular/core';

import {TranslatePipe} from "@ngx-translate/core";
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatPrefix} from '@angular/material/input';
import {ClientActionsComponent} from '../../../entities/main-scope/client/components/client-actions/client-actions.component';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {PermissionDirective} from '../../../../core/auth/directives/show-if-has-role.directive';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TabLink} from '../../models/tab-link';

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  imports: [
    TranslatePipe,
    MatPrefix,
    MatCard,
    MatCardContent,
    MatPrefix,
    ClientActionsComponent,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    PermissionDirective,
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
