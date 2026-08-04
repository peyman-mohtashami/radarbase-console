import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {SourceConfigService} from '../../services/source-config.service';
import {SourceDialogService} from '../../services/source-dialog.service';
import {AppSource} from '../../models/source';
import {SourceTableRowComponent} from '../../components/source-table-row/source-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../shared/components/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../shared/components/entity-list-page/entity-list-page.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectStore} from '../../../project/services/project.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../shared/consts/default-table-values';
import {TableElement} from '../../../../shared/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogMode} from '../../../../shared/enums/dialog';
import {ROLES} from '../../../../../shared/enums/roles';
import {SourceStore} from '../../services/source.store';

@Component({
  selector: 'app-source-list-page',
  templateUrl: './source-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    SourceTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class SourceListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(SourceStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(SourceConfigService);
  readonly dialogService = inject(SourceDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppSource>(true, []);

  ngOnInit() {
    // Reopen a dialog that was interrupted by session expiry, with its entered fields.
    void this.dialogService.restorePendingDialog();
  }

  async handleFilterChange(event: FilterEvent) {
    await this.store.setFilter(event);
  }

  async switchPage(page: PageEvent) {
    await this.store.setPage(page);
  }

  async switchSort(element: TableElement) {
    await this.store.toggleSort(element);
  }

  protected async openDialog(dialogMode: DialogMode) {
    await this.dialogService.openDialog(dialogMode);
  }
}
