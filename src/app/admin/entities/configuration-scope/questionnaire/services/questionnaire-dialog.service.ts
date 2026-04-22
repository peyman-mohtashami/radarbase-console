import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppQuestionnaire, RadarQuestionnaire} from "../models/questionnaire";
import {QuestionnaireService} from "./questionnaire.service";
import {
  QuestionnaireDialogComponent
} from "../containers/questionnaire-dialog/questionnaire-dialog.component";
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {QuestionnaireConfigService} from './questionnaire-config.service';

@Injectable({providedIn: 'root'})
export class QuestionnaireDialogService extends BaseDialogService<AppQuestionnaire, RadarQuestionnaire, QuestionnaireDialogComponent> {
  override entityService = inject(QuestionnaireService);
  override configService = inject(QuestionnaireConfigService);

  override createDialogRef(
    mode: DialogMode,
    entity?: AppQuestionnaire,
  ): MatDialogRef<QuestionnaireDialogComponent> {
    const questionnaireFullList = this.entityService.getWithQuery();

    const _data = {id: 'questionnaire-dialog', mode, entity, questionnaireFullList};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(QuestionnaireDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(QuestionnaireDialogComponent, {
          id: 'questionnaire-dialog',
          data: _data,
          panelClass: 'tailwind-slide-panel',
          width: '80%',
          height: '100vh',
          position: {right: '0'},
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
    }
  }
}
