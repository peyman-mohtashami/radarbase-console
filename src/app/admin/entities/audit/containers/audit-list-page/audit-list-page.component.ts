import {Component, OnDestroy, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {AuditService} from '../../services/audit.service';
import {AuditConfigService} from '../../services/audit-config.service';
import {AuditTableRowComponent} from '../../components/audit-table-row/audit-table-row.component';
import {AppAudit, RadarAudit} from '../../models/audit';
import {ListPageHeaderComponent} from '../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';

@Component({
  selector: 'app-audit-list-page',
  templateUrl: './audit-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    AuditTableRowComponent,
    EntityListPageComponent,
  ]
})
export class AuditListPageComponent extends BaseEntityListPageComponent<AppAudit, RadarAudit> implements OnDestroy {
  override entityService = inject(AuditService);
  override configService = inject(AuditConfigService);

  override entities = signal<AppAudit[]>(this.activatedRoute.snapshot.data['auditList']);

  ngOnDestroy() {
    super.destroy();
  }
}
