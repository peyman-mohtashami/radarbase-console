import {Component, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {AppSourceData, SourceDataDto} from "../../models/source-data";

import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {BaseEntityPageComponent} from '../../../../base-entities/containers/entity-page/base-entity-page.component';
import {SourceDataActionsComponent} from '../../components/source-data-actions/source-data-actions.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TabLink} from '../../../../base-entities/models/tab-link';
import {ENTITY_REGISTRY} from '../../../../../shared/consts/entity-registry';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  SourceTypeActionsComponent
} from '../../../source-type/components/source-type-actions/source-type-actions.component';
import {ProjectStore} from '../../../project/services/project.store';
import {OrganizationStore} from '../../../organization/services/organization.store';
import {ROLES} from '../../../../../shared/enums/roles';
import {SourceDataStore} from '../../services/source-data.store';

@Component({
  selector: 'app-source-data-page',
  templateUrl: './source-data-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    MatPrefix,
    SourceDataActionsComponent,
    RouterLink,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLinkActive,
    RouterOutlet,
    MatButton,
    MatIcon,
    SourceTypeActionsComponent
  ]
})
export class SourceDataPageComponent {
  protected readonly ROLES = ROLES;
  protected readonly ENTITY_REGISTRY = ENTITY_REGISTRY;

  protected store = inject(SourceDataStore);
  protected projectStore = inject(ProjectStore);
  protected organizationStore = inject(OrganizationStore);
  configService = inject(SourceDataConfigService);

  links: TabLink[] = [
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.sourceData.name}.details` },
  ];
}
