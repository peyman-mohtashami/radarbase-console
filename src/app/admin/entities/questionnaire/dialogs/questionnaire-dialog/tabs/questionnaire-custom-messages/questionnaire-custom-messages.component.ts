import {Component, effect, inject, output, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';

export interface QuestionnaireCustomMessagesForm {
  showIntroduction: string;
  startText: string;
  endText: string;
  warningEnabled: boolean;
  warn: string;
  estimatedCompletionTime: string;
}

@Component({
  selector: 'app-questionnaire-custom-messages',
  templateUrl: 'questionnaire-custom-messages.component.html',
  imports: [
    TranslatePipe,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    FormField,
  ]
})
export class QuestionnaireCustomMessagesComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);

  valid = output<boolean>();

  protected model = signal<QuestionnaireCustomMessagesForm>({//this.dialogData.restoredModel ?? {
    ...this.dialogState.questionnaire()?.schedule,
    showIntroduction: this.dialogState.questionnaire()?.showIntroduction ?? 'no',
    startText: this.dialogState.questionnaire()?.startText?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
    endText: this.dialogState.questionnaire()?.endText?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
    warningEnabled: this.dialogState.questionnaire()?.warningEnabled ?? false,
    warn: this.dialogState.questionnaire()?.warn?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
    estimatedCompletionTime: this.dialogState.questionnaire()?.estimatedCompletionTime ?? ''
  });

  protected form = form(this.model, (schema) => {

  });

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.dialogState.questionnaire());
      const defaultLanguage = entity?.defaultLanguage;
      if (!defaultLanguage) return;

      const updated = {
        ...entity,
        showIntroduction: model.showIntroduction,
        startText: {...entity?.startText, [defaultLanguage.code]: model.startText},
        endText: {...entity?.endText, [defaultLanguage.code]: model.endText},
        warningEnabled: model.warningEnabled,
        warn: {...entity?.warn, [defaultLanguage.code]: model.warn},
      } as AppQuestionnaire;
      this.dialogState.questionnaire.set(updated);
      this.valid.emit(this.form().valid());
    });
  }
}
