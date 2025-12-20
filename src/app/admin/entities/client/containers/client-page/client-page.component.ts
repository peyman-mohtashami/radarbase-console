import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

import { AppClient } from "../../models/client";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPrefix} from "@angular/material/input";
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {ActionsComponent} from '../../components/actions/actions.component';
import {TabLink} from "../../../../models/tab-link";
import {ENTITY_REGISTRY} from "../../../../../shared/consts/entity-registry";
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';

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
    ActionsComponent
  ]
})
export class ClientPageComponent extends BaseEntityPageComponent<AppClient> implements OnInit, OnDestroy {
  override configService = inject(ClientConfigService);
  override dialogService = inject(ClientDialogService);

  links: TabLink[] = [
    { path: 'configs', label: `ADMIN.${ENTITY_REGISTRY.config.name}.title.plural` },
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.client.name}.details` },
  ];

  activePath?: string;

  override entity = signal<AppClient>(this.activatedRoute.snapshot.data['client']);
  entities = this.activatedRoute.snapshot.data['entities'];

  hasChildren = !!this.activatedRoute.firstChild?.firstChild?.snapshot?.params?.['id'];


  ngOnInit(): void {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override navigateOnUpdateSuccess(entity: AppClient) {
    this.router.navigate(['/admin', 'clients', entity.clientId]).then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'clients']).then();
  }
}
