import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {AuditService} from '../../services/audit.service';
import {AuditConfigService} from '../../services/audit-config.service';
import {AuditTableRowComponent} from '../../components/audit-table-row/audit-table-row.component';
import {AppAudit} from '../../models/audit';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';

@Component({
  selector: 'app-audit-list-page',
  templateUrl: './audit-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    AuditTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class AuditListPageComponent extends BaseEntityListPageComponent<AppAudit> implements OnInit, OnDestroy {
  override entityService = inject(AuditService);
  override configService = inject(AuditConfigService);

  ngOnInit() {}

  ngOnDestroy() {
    super.destroy();
  }
}
