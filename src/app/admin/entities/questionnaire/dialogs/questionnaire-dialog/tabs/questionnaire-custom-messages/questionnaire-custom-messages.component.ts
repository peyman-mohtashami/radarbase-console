import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';

export interface QuestionnaireCustomMessagesForm {
  title: Record<string, string>;
  description: Record<string, string>;
  showIntroduction: string;
  startText: Record<string, string>;
  endText: Record<string, string>;
  warningEnabled: boolean;
  warn: Record<string, string>;
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

  lang = computed(() => {
    return this.dialogState.questionnaire()!.defaultLanguage!.code;
  })

  protected model = signal<QuestionnaireCustomMessagesForm>({//this.dialogData.restoredModel ?? {
    ...this.dialogState.questionnaire(),
    title: this.dialogState.questionnaire()?.title?.[this.lang()] ? this.dialogState.questionnaire()!.title! : {...this.dialogState.questionnaire()?.title, [this.lang()]: ''},
    description: this.dialogState.questionnaire()?.description?.[this.lang()] ? this.dialogState.questionnaire()!.description! : {...this.dialogState.questionnaire()?.description, [this.lang()]: ''},
    showIntroduction: this.dialogState.questionnaire()?.showIntroduction ?? 'no',
    startText: this.dialogState.questionnaire()?.startText?.[this.lang()] ? this.dialogState.questionnaire()!.startText! : {...this.dialogState.questionnaire()?.startText, [this.lang()]: ''},
    endText: this.dialogState.questionnaire()?.endText?.[this.lang()] ? this.dialogState.questionnaire()!.endText! : {...this.dialogState.questionnaire()?.endText, [this.lang()]: ''},
    warningEnabled: this.dialogState.questionnaire()?.warningEnabled ?? false,
    warn: this.dialogState.questionnaire()?.warn?.[this.lang()] ? this.dialogState.questionnaire()!.warn! : {...this.dialogState.questionnaire()?.warn, [this.lang()]: ''},
  });

  protected form = form(this.model);

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.dialogState.questionnaire());
      const updated = {
        ...entity,
        ...model,
        isCustomMessagesTabValid: this.form().valid()
      } as AppQuestionnaire;
      this.dialogState.questionnaire.set(updated);
    });
  }
}
