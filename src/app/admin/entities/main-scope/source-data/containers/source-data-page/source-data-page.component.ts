import {Component, inject, signal} from '@angular/core';
import {AppSourceData, RadarSourceData} from "../../models/source-data";

import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {BaseEntityPageComponent} from '../../../../../base-entities/containers/entity-page/base-entity-page.component';
import {SourceDataActionsComponent} from '../../components/source-data-actions/source-data-actions.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TabLink} from '../../../../../base-entities/models/tab-link';
import {ENTITY_REGISTRY} from '../../../../../../shared/consts/entity-registry';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';

@Component({
  selector: 'app-source-data-page',
  templateUrl: './source-data-page.component.html',
  imports: [
    TranslatePipe,
    MatPrefix,
    SourceDataActionsComponent,
    RouterLink,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLinkActive,
    RouterOutlet
  ]
})
export class SourceDataPageComponent extends BaseEntityPageComponent<AppSourceData, RadarSourceData> {

  override configService = inject(SourceDataConfigService);
  override dialogService = inject(SourceDataDialogService);

  override entity = signal<AppSourceData>(this.activatedRoute.snapshot.data['sourceData']);

  links: TabLink[] = [
    { path: 'details', label: `ADMIN.${ENTITY_REGISTRY.sourceData.name}.details` },
  ];
}
