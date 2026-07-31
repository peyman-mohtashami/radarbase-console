 import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {SubjectTableRowComponent} from '../../components/subject-table-row/subject-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {SubjectAssignGroupComponent} from '../../components/subject-assign-group/subject-assign-group.component';
 import {MatButton} from '@angular/material/button';
 import {MatIcon} from '@angular/material/icon';
 import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
 import {TranslatePipe} from '@ngx-translate/core';
 import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
 import {PageEvent} from '@angular/material/paginator';
 import {MIN_ENTITIES_FOR_FILTERS} from '../../../../base-entities/consts/default-table-values';
 import {TableElement} from '../../../../base-entities/models/table.model';
 import {DialogMode} from '../../../../base-entities/enums/dialog';
 import {ROLES} from '../../../../../shared/enums/roles';
 import {SubjectStore} from '../../services/subject.store';
 import {SubjectDialogMode} from '../../enums/dialog';
 import {ProjectStore} from '../../../project/services/project.store';

@Component({
  selector: 'app-subject-list-page',
  templateUrl: './subject-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    SubjectTableRowComponent,
    EntityListPageComponent,
    SubjectAssignGroupComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class SubjectListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;
  protected readonly SubjectDialogMode = SubjectDialogMode;

  readonly store = inject(SubjectStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(SubjectConfigService);
  readonly dialogService = inject(SubjectDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;

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

  protected async openDialog(dialogMode: SubjectDialogMode) {
    await this.dialogService.openDialog(dialogMode);
  }
}


