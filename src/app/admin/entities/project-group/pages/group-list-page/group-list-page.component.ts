import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {GroupTableRowComponent} from '../../components/group-table-row/group-table-row.component';
import {GroupConfigService} from '../../services/group-config.service';
import {GroupDialogService} from '../../services/group-dialog.service';
import {AppGroup} from '../../models/group';
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
import {GroupStore} from '../../services/group.store';

@Component({
  selector: 'app-group-list-page',
  templateUrl: './group-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    GroupTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class GroupListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(GroupStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(GroupConfigService);
  readonly dialogService = inject(GroupDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppGroup>(true, []);

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
