import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {AuditConfigService} from '../../services/audit-config.service';
import {AuditTableRowComponent} from '../../components/audit-table-row/audit-table-row.component';
import {AppAudit} from '../../models/audit';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectStore} from '../../../../project/services/project.store';
import {getHighestPriorityClass} from '../../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../../base-entities/consts/default-table-values';
import {TableElement} from '../../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {ROLES} from '../../../../../../shared/enums/roles';
import {AuditStore} from '../../services/audit.store';

@Component({
  selector: 'app-audit-list-page',
  templateUrl: './audit-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    AuditTableRowComponent,
    EntityListPageComponent,
    TranslatePipe,
  ]
})
export class AuditListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(AuditStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(AuditConfigService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppAudit>(true, []);

  async handleFilterChange(event: FilterEvent) {
    await this.store.setFilter(event);
  }

  async switchPage(page: PageEvent) {
    await this.store.setPage(page);
  }

  async switchSort(element: TableElement) {
    await this.store.toggleSort(element);
  }
}
