import {
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {AppOrganization} from '../../models/organization';
import {OrganizationTableRowComponent} from '../../components/organization-table-row/organization-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {PageEvent} from '@angular/material/paginator';
import {TableElement} from '../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../base-entities/consts/default-table-values';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {ROLES} from '../../../../../shared/enums/roles';
import {OrganizationStore} from '../../services/organization.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';

@Component({
  selector: 'app-organization-list-page',
  templateUrl: './organization-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    OrganizationTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class OrganizationListPageComponent implements OnInit {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(OrganizationStore);
  readonly configService = inject(OrganizationConfigService);
  readonly dialogService = inject(OrganizationDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppOrganization>(true, []);

  ngOnInit() {
    // Reopen a dialog that was interrupted by a session expiry, with its entered fields.
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

  toggleViewMode() {
    this.gridView = !this.gridView;
    this.configService.setViewMode(this.gridView ? 'grid' : 'list');
  }

  protected async openDialog(dialogMode: DialogMode) {
    await this.dialogService.openDialog(dialogMode);
  }
}
