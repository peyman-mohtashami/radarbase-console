import {Component, computed, inject, signal} from '@angular/core';
import { DialogMode } from '../../../../shared/enums/dialog';
import {AppConfig} from "../../models/config";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {ConfigTableRowComponent} from "../../components/config-table-row/config-table-row.component";
import {
  DataTableFilterComponent, FilterEvent,
} from "../../../../shared/components/data-table-filter/data-table-filter.component";
import {ConfigConfigService} from "../../services/config-config.service";
import {ConfigDialogService} from "../../services/config-dialog.service";
import {MatIcon} from '@angular/material/icon';
import {EntityListPageComponent} from '../../../../shared/components/entity-list-page/entity-list-page.component';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../shared/consts/default-table-values';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {ProjectStore} from '../../../project/services/project.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {SelectionModel} from '@angular/cdk/collections';
import {PageEvent} from '@angular/material/paginator';
import {TableElement} from '../../../../shared/models/table.model';
import {ROLES} from '../../../../../shared/enums/roles';
import {ConfigStore} from '../../services/config.store';

@Component({
  selector: 'app-config-list-page',
  templateUrl: './config-list-page.component.html',
  imports: [
    LoaderComponent,
    TranslatePipe,
    ReactiveFormsModule,
    ConfigTableRowComponent,
    DataTableFilterComponent,
    MatButton,
    MatIcon,
    EntityListPageComponent,
    PermissionDirective,
  ]
})
export class ConfigListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(ConfigStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(ConfigConfigService);
  readonly dialogService = inject(ConfigDialogService);

  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppConfig>(true, []);

  isChanged = computed(() => {
    return this.store.differences().length;
  });

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

  openPublishDialog(mode: "discard" | "publish") {
    return this.dialogService.openPublishDialog(mode);
  }

  protected showHistory() {
    // TODO
  }
}
