import {Component, inject, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {ProjectConfigService} from '../../services/project-config.service';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {AppProject} from '../../models/project';
import {ProjectTableRowComponent} from '../../components/project-table-row/project-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../shared/components/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../shared/components/entity-list-page/entity-list-page.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogMode} from '../../../../shared/enums/dialog';
import {PageEvent} from '@angular/material/paginator';
import {TableElement} from '../../../../shared/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../shared/consts/default-table-values';
import {ROLES} from '../../../../../shared/enums/roles';
import {ProjectStore} from '../../services/project.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';

@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    ProjectTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class ProjectListPageComponent implements OnInit {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(ProjectStore);
  readonly configService = inject(ProjectConfigService);
  readonly dialogService = inject(ProjectDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppProject>(true, []);

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

  toggleViewMode() {
    this.gridView = !this.gridView;
    this.configService.setViewMode(this.gridView ? 'grid' : 'list');
  }

  protected async openDialog(dialogMode: DialogMode) {
    await this.dialogService.openDialog(dialogMode);
  }
}
