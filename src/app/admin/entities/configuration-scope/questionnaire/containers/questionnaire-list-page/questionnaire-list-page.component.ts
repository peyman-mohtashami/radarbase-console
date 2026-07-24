import {Component, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';

import {QuestionnaireService} from "../../services/questionnaire.service";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {QuestionnaireDialogService} from "../../services/questionnaire-dialog.service";
import {AppQuestionnaire} from "../../models/questionnaire";
import {
  QuestionnaireTableRowComponent
} from "../../components/questionnaire-table-row/questionnaire-table-row.component";
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {
  BaseEntityListPageComponent
} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-questionnaire-list-page',
  templateUrl: './questionnaire-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
export class QuestionnaireListPageComponent extends BaseEntityListPageComponent<AppQuestionnaire, AppQuestionnaire> {
  override entityService = inject(QuestionnaireService);
  override configService = inject(QuestionnaireConfigService);
  override dialogService = inject(QuestionnaireDialogService);
  private questionnaireService = inject(QuestionnaireService)

  override entities = signal<AppQuestionnaire[]>(this.activatedRoute.snapshot.data['questionnaireList']);

  projectId = this.activatedRoute.snapshot.paramMap.get('projectId');
  subjectId = this.activatedRoute.snapshot.paramMap.get('subjectId');

  override ngOnInit() {
    super.ngOnInit();
    this.activatedRoute.data.subscribe(() => {
      this.refreshEntities();
      this.dialogService.dialogUpdateEvent.set(undefined);
    })
  }

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.projectId ?? undefined, this.subjectId ?? undefined);
  }

  protected showHistory() {
    // TODO
  }

  protected onDuplicate(entity: AppQuestionnaire) {
    const duplicateEntity: AppQuestionnaire = {...entity, name: `${entity.name}_copy`};
    this.questionnaireService.add(duplicateEntity).subscribe(() => this.handleDialogUpdate());
  }

  protected onActiveChange(event: boolean, entity: AppQuestionnaire) {
    const updatedEntity: AppQuestionnaire = {...entity, isActive: event};
    this.questionnaireService.update(updatedEntity).subscribe(() => this.handleDialogUpdate());
  }
}
