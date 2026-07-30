import {
  Component,
  inject,
  signal,
  OnInit
} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {SourceTypeTableRowComponent} from '../../components/source-type-table-row/source-type-table-row.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {ROLES} from '../../../../../shared/enums/roles';
import {PageEvent} from '@angular/material/paginator';
import {TableElement} from '../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../base-entities/consts/default-table-values';
import {SourceTypeStore} from '../../services/source-type.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {AppSourceType} from '../../models/source-type';

@Component({
  selector: 'app-source-type-list-page',
  templateUrl: './source-type-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    EntityListPageComponent,
    SourceTypeTableRowComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class SourceTypeListPageComponent implements OnInit {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(SourceTypeStore);
  readonly configService = inject(SourceTypeConfigService);
  readonly dialogService = inject(SourceTypeDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppSourceType>(true, []);

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
