import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {AppSourceData} from "../../models/source-data";

import {SourceDataDetailsComponent} from "../../components/source-data-details/source-data-details.component";
import {MatCard, MatCardContent} from '@angular/material/card';
import {ActionsComponent} from '../../components/actions/actions.component';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {AppSourceType} from '../../../source-type/models/source-type';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPrefix} from '@angular/material/input';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {BaseEntityPageComponent} from '../../../../components/entity-page/base-entity-page.component';

@Component({
  selector: 'app-source-data-page',
  templateUrl: './source-data-page.component.html',
  imports: [
    SourceDataDetailsComponent,
    MatCard,
    MatCardContent,
    ActionsComponent,
    TranslatePipe,
    MatPrefix
  ]
})
export class SourceDataPageComponent extends BaseEntityPageComponent<AppSourceData> implements OnInit, OnDestroy {

  override configService = inject(SourceDataConfigService);
  override dialogService = inject(SourceDataDialogService);

  override entity = signal<AppSourceData>(this.activatedRoute.snapshot.data['sourceData']);
  sourceTypeFullList: AppSourceType[] = this.activatedRoute.snapshot.data['sourceTypeFullList'];

  ngOnInit(): void {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override navigateOnUpdateSuccess(entity: AppSourceData) {
    this.router
      .navigate(['/admin', 'source-data', entity.sourceDataName])
      .then();
  }

  override navigateOnDeleteSuccess() {
    this.router.navigate(['/admin', 'source-data']).then();
  }

  override getDialogData(entity?: AppSourceData) {
    return {entity, sourceTypes: this.sourceTypeFullList}
  }
}
