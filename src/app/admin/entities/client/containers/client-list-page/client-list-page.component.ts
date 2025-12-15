import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {ClientService} from '../../services/client.service';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {AppClient} from '../../models/client';
import {ClientTableRowComponent} from '../../components/client-table-row/client-table-row.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';

@Component({
  selector: 'app-client-list-page',
  templateUrl: './client-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    ClientTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class ClientListPageComponent extends BaseEntityListPageComponent<AppClient> implements OnInit, OnDestroy {

  override entityService = inject(ClientService);
  override configService = inject(ClientConfigService);
  override dialogService = inject(ClientDialogService);

  sourceTypes: AppClient[] = this.activatedRoute.snapshot.data['sourceTypes'];

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
