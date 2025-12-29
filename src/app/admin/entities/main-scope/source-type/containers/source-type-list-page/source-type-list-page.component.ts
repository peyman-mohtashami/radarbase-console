import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {AppSourceType, RadarSourceType} from '../../models/source-type';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {SourceTypeService} from '../../services/source-type.service';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {SourceTypeTableRowComponent} from '../../components/source-type-table-row/source-type-table-row.component';

@Component({
  selector: 'app-source-type-list-page',
  templateUrl: './source-type-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    EntityListPageComponent,
    SourceTypeTableRowComponent,
  ]
})
export class SourceTypeListPageComponent extends BaseEntityListPageComponent<AppSourceType, RadarSourceType> implements OnInit, OnDestroy {
  override entityService = inject(SourceTypeService);
  override configService = inject(SourceTypeConfigService);
  override dialogService = inject(SourceTypeDialogService);

  override entities = signal<AppSourceType[]>(this.activatedRoute.snapshot.data['sourceTypeList']);

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
