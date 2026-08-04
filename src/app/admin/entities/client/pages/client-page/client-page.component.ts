import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TabLink} from "../../../../shared/models/tab-link";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {ClientActionsComponent} from '../../components/client-actions/client-actions.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ClientStore} from '../../services/client.store';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterOutlet,
    RouterLink,
    PermissionDirective,
    ClientActionsComponent,
    RouterLinkActive,
    MatButton,
    MatIcon,
  ]
})
export class ClientPageComponent {
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(ClientStore);

  links: TabLink[] = [
    { path: 'configs', label: `ADMIN.${ENTITY_REGISTRY.config.name}.title.plural` },
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.client.name}.details` },
  ];
}
