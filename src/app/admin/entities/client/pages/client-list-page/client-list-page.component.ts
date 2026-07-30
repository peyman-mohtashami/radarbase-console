import {Component, inject, signal, OnInit} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {AppClient} from '../../models/client';
import {ClientTableRowComponent} from '../../components/client-table-row/client-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../base-entities/consts/default-table-values';
import {TableElement} from '../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {ROLES} from '../../../../../shared/enums/roles';
import {ClientStore} from '../../services/client.store';

@Component({
  selector: 'app-client-list-page',
  templateUrl: './client-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    ClientTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class ClientListPageComponent implements OnInit {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(ClientStore);
  readonly configService = inject(ClientConfigService);
  readonly dialogService = inject(ClientDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppClient>(true, []);

  ngOnInit() {
    // Reopen a dialog that was interrupted by session expiry, with its entered fields.
    void this.dialogService.restorePendingDialog();
  }

  handleFilterChange(event: FilterEvent) {
    this.store.setFilter(event);
  }

  switchPage(page: PageEvent) {
    this.store.setPage(page);
  }

  switchSort(element: TableElement) {
    this.store.toggleSort(element);
  }

  protected async openDialog(dialogMode: DialogMode) {
    await this.dialogService.openDialog(dialogMode);
  }
}
