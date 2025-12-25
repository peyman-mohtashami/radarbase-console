import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {AppSourceData, RadarSourceData} from "../../models/source-data";

import {SourceDataDetailsComponent} from "../../components/source-data-details/source-data-details.component";
import {MatCard, MatCardContent} from '@angular/material/card';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {BaseEntityPageComponent} from '../../../../base-entities/containers/entity-page/base-entity-page.component';
import {SourceDataActionsComponent} from '../../components/source-data-actions/source-data-actions.component';

@Component({
  selector: 'app-source-data-page',
  templateUrl: './source-data-page.component.html',
  imports: [
    SourceDataDetailsComponent,
    MatCard,
    MatCardContent,
    TranslatePipe,
    MatPrefix,
    SourceDataActionsComponent
  ]
})
export class SourceDataPageComponent extends BaseEntityPageComponent<AppSourceData, RadarSourceData> implements OnInit, OnDestroy {

  override configService = inject(SourceDataConfigService);
  override dialogService = inject(SourceDataDialogService);

  override entity = signal<AppSourceData>(this.activatedRoute.snapshot.data['sourceData']);

  ngOnInit(): void {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
