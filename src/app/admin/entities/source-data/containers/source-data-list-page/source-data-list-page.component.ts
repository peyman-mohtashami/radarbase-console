import {Component, OnDestroy, OnInit, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import { SourceDataTableRowComponent } from '../../components/source-data-table-row/source-data-table-row.component';
import {SourceDataService} from '../../services/source-data.service';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {AppSourceData} from '../../models/source-data';
import {SourceDataConfigService} from '../../services/source-data-config.service';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';

@Component({
  selector: 'app-source-data-list-page',
  templateUrl: './source-data-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    SourceDataTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class SourceDataListPageComponent extends BaseEntityListPageComponent<AppSourceData> implements OnInit, OnDestroy {

  override entityService = inject(SourceDataService);
  override configService = inject(SourceDataConfigService);
  override dialogService = inject(SourceDataDialogService);

  override entities = signal<AppSourceData[]>(this.activatedRoute.snapshot.data['sourceDataList']);

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override getDialogData(entity?: AppSourceData) {
    return {
      entity: entity,
      entities: this.entities(),
    }
  }
}
