import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../shared/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppQuestionnaire} from "../models/questionnaire";
import {
  QuestionnaireDialogComponent, QuestionnaireForm, StoredQuestionnaireDialog
} from "../dialogs/questionnaire-dialog/questionnaire-dialog.component";
import {QuestionnaireConfigService} from './questionnaire-config.service';
import {QuestionnaireStore} from './questionnaire.store';

@Injectable({providedIn: 'root'})
export class QuestionnaireDialogService {
  private store = inject(QuestionnaireStore);
  private dialog = inject(MatDialog);
  private configService = inject(QuestionnaireConfigService);

  async openDialog(mode: DialogMode, entity?: AppQuestionnaire, restoredModel?: QuestionnaireForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredQuestionnaireDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(
    mode: DialogMode,
    entity?: AppQuestionnaire,
    restoredModel?: QuestionnaireForm
  ): Promise<MatDialogRef<QuestionnaireDialogComponent>> {
    if (this.store.allItems().length === 0) {
      await this.store.getAll();
    }
    const questionnaireFullList = this.store.allItems();

    const _data = {id: 'questionnaire-dialog', mode, entity, questionnaireFullList, restoredModel};

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
