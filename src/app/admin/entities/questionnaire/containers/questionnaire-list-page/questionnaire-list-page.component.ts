import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {ListPageHeaderComponent} from '../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';

import {QuestionnaireService} from "../../services/questionnaire.service";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {QuestionnaireDialogService} from "../../services/questionnaire-dialog.service";
import {AppQuestionnaire, RadarQuestionnaire} from "../../models/questionnaire";
import {
  QuestionnaireTableRowComponent
} from "../../components/questionnaire-table-row/questionnaire-table-row.component";
import {AppProject} from "../../../project/models/project";
import {AppSubject} from "../../../subject/models/subject";
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {
  BaseEntityListPageComponent
} from '../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-questionnaire-list-page',
  templateUrl: './questionnaire-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    QuestionnaireTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
  ]
})
export class QuestionnaireListPageComponent extends BaseEntityListPageComponent<AppQuestionnaire, RadarQuestionnaire> implements OnInit, OnDestroy {
  override entityService = inject(QuestionnaireService);
  override configService = inject(QuestionnaireConfigService);
  override dialogService = inject(QuestionnaireDialogService);

  override entities = signal<AppQuestionnaire[]>(this.activatedRoute.snapshot.data['questionnaireList']);

  project: AppProject | undefined = this.selectedEntitiesService.selectedProject();
  subject: AppSubject | undefined = this.selectedEntitiesService.selectedSubject();

  ngOnInit() {
    super.init();
    this.activatedRoute.data.subscribe(() => {
      this.refreshEntities();
      this.dialogService.dialogUpdateEvent.set(undefined);
    })
  }

  ngOnDestroy() {
    super.destroy();
  }

  protected showHistory() {
    // TODO
  }
}
