import {Component, inject, signal, OnInit} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import { SourceDataTableRowComponent } from '../../components/source-data-table-row/source-data-table-row.component';
import {AppSourceData} from '../../models/source-data';
import {SourceDataConfigService} from '../../services/source-data-config.service';
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
import {SourceDataStore} from '../../services/source-data.store';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';

@Component({
  selector: 'app-source-data-list-page',
  templateUrl: './source-data-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    SourceDataTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class SourceDataListPageComponent implements OnInit {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(SourceDataStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(SourceDataConfigService);
  readonly dialogService = inject(SourceDataDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppSourceData>(true, []);

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
