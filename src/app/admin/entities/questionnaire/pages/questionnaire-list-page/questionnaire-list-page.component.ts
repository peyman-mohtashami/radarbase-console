import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../shared/components/data-table-filter/data-table-filter.component';

import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {QuestionnaireDialogService} from "../../services/questionnaire-dialog.service";
import {
  QuestionnaireTableRowComponent
} from "../../components/questionnaire-table-row/questionnaire-table-row.component";
import {EntityListPageComponent} from '../../../../shared/components/entity-list-page/entity-list-page.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectStore} from '../../../project/services/project.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {SelectionModel} from '@angular/cdk/collections';
import {AppConfig} from '../../../config/models/config';
import {PageEvent} from '@angular/material/paginator';
import {TableElement} from '../../../../shared/models/table.model';
import {DialogMode} from '../../../../shared/enums/dialog';
import {ROLES} from '../../../../../shared/enums/roles';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../shared/consts/default-table-values';
import {QuestionnaireStore} from '../../services/questionnaire.store';
import {AppQuestionnaire} from '../../models/questionnaire';

@Component({
  selector: 'app-questionnaire-list-page',
  templateUrl: './questionnaire-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    QuestionnaireTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class QuestionnaireListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(QuestionnaireStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(QuestionnaireConfigService);
  readonly dialogService = inject(QuestionnaireDialogService);

  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppConfig>(true, []);

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

  protected async onDuplicate(entity: AppQuestionnaire) {
    const duplicateEntity: AppQuestionnaire = {...entity, name: `${entity.name}_copy`};
    await this.store.add(duplicateEntity);//.subscribe(() => this.handleDialogUpdate());
  }

  protected async onActiveChange(event: boolean, entity: AppQuestionnaire) {
    const updatedEntity: AppQuestionnaire = {...entity, isActive: event};
    await this.store.update(updatedEntity);//.subscribe(() => this.handleDialogUpdate());
  }


  protected showHistory() {
    // TODO
  }
}
