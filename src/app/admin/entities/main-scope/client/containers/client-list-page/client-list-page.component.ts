import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {ClientService} from '../../services/client.service';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {AppClient, RadarClient} from '../../models/client';
import {ClientTableRowComponent} from '../../components/client-table-row/client-table-row.component';
import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';

@Component({
  selector: 'app-client-list-page',
  templateUrl: './client-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    ClientTableRowComponent,
    EntityListPageComponent,
  ]
})
export class ClientListPageComponent extends BaseEntityListPageComponent<AppClient, RadarClient> implements OnInit, OnDestroy {

  override entityService = inject(ClientService);
  override configService = inject(ClientConfigService);
  override dialogService = inject(ClientDialogService);

  override entities = signal<AppClient[]>(this.activatedRoute.snapshot.data['clientList']);

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
