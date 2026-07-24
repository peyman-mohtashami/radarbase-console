import {Component, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {AppSourceType, RadarSourceType} from "../../models/source-type";
import {TranslatePipe} from "@ngx-translate/core";
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';
import {MatPrefix} from '@angular/material/input';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {BaseEntityPageComponent} from '../../../../../base-entities/containers/entity-page/base-entity-page.component';
import {SourceTypeActionsComponent} from '../../components/source-type-actions/source-type-actions.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {TabLink} from '../../../../../base-entities/models/tab-link';
import {ENTITY_REGISTRY} from '../../../../../../shared/consts/entity-registry';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';
import {ProjectActionsComponent} from '../../../project/components/project-actions/project-actions.component';

@Component({
  selector: 'app-source-type-page',
  templateUrl: './source-type-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    MatPrefix,
    SourceTypeActionsComponent,
    RouterLink,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLinkActive,
    RouterOutlet,
    MatButton,
    MatIcon,
    PermissionDirective,
    ProjectActionsComponent,
  ]
})
export class SourceTypePageComponent extends BaseEntityPageComponent<AppSourceType, RadarSourceType> {
  override configService = inject(SourceTypeConfigService);
  override dialogService = inject(SourceTypeDialogService);

  override entity = signal<AppSourceType>(this.activatedRoute.snapshot.data['sourceType']);

  links: TabLink[] = [
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.sourceType.name}.details` },
  ];

  override navigateOnUpdateSuccess(entity: AppSourceType) {
    this.router
      .navigate([
        '/admin',
        'source-types',
        entity.producer,
        entity.model,
        entity.catalogVersion,
      ])
      .then();
  }
}
