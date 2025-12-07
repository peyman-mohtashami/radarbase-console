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
import {BaseEntitiesPageComponent} from '../../../../components/entities-page/base-entities-page.component';
import {EntitiesPageComponent} from '../../../../components/entities-page/entities-page.component';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    ClientTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class ClientsPageComponent extends BaseEntitiesPageComponent<AppClient> implements OnInit, OnDestroy {

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
