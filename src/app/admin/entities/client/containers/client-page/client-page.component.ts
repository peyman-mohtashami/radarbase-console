import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

import {AppClient, RadarClient} from "../../models/client";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPrefix} from "@angular/material/input";
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TabLink} from "../../../../base-entities/models/tab-link";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseEntityPageComponent} from '../../../../base-entities/containers/entity-page/base-entity-page.component';
import {ClientActionsComponent} from '../../components/client-actions/client-actions.component';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    MatPrefix,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterOutlet,
    RouterLink,
    PermissionDirective,
    ClientActionsComponent,
    RouterLinkActive,
  ]
})
export class ClientPageComponent extends BaseEntityPageComponent<AppClient, RadarClient> implements OnInit, OnDestroy {
  override configService = inject(ClientConfigService);
  override dialogService = inject(ClientDialogService);

  override entity = signal<AppClient>(this.activatedRoute.snapshot.data['client']);

  links: TabLink[] = [
    { path: 'configs', label: `ADMIN.${ENTITY_REGISTRY.config.name}.title.plural` },
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.client.name}.details` },
  ];

  ngOnInit(): void {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
