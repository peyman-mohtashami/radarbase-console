import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {AppSourceType} from '../../models/source-type';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {SourceTypeService} from '../../services/source-type.service';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {SourceTypeTableRowComponent} from '../../components/source-type-table-row/source-type-table-row.component';

@Component({
  selector: 'app-source-type-list-page',
  templateUrl: './source-type-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    EntitiesPageComponent,
    SourceTypeTableRowComponent,
  ]
})
export class SourceTypeListPageComponent extends BaseEntityListPageComponent<AppSourceType> implements OnInit, OnDestroy {
  override entityService = inject(SourceTypeService);
  override configService = inject(SourceTypeConfigService);
  override dialogService = inject(SourceTypeDialogService);

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
