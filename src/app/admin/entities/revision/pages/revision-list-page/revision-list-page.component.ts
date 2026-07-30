import {Component, inject, signal} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {RevisionConfigService} from '../../services/revision-config.service';
import {AppRevision} from '../../models/revision';
import {RevisionTableRowComponent} from '../../components/revision-table-row/revision-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {ProjectStore} from '../../../project/services/project.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../base-entities/consts/default-table-values';
import {TableElement} from '../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {ROLES} from '../../../../../shared/enums/roles';
import {RevisionStore} from '../../services/revision.store';
import {DialogMode} from '../../../../base-entities/enums/dialog';

@Component({
  selector: 'app-revision-list-page',
  templateUrl: './revision-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    TranslatePipe,
    RevisionTableRowComponent,
    TagComponent,
    EntityListPageComponent,
  ]
})
export class RevisionListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(RevisionStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(RevisionConfigService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppRevision>(true, []);

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
