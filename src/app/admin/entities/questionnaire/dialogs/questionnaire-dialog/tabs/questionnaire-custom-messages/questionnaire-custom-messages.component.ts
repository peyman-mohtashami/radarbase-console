import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';

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
    CdkTextareaAutosize,
    MatError,
  ]
})
export class QuestionnaireCustomMessagesComponent {
  protected store = inject(QuestionnaireStore);

  lang = computed(() => {
    return this.store.selected()!.defaultLanguage.code;
  });

  _questionnaire = this.store.selected();
  _lang = this.lang();

  protected model = signal<QuestionnaireCustomMessagesForm>({//this.dialogData.restoredModel ?? {
    ...this._questionnaire,
    title: withLanguage(this._questionnaire?.title, this._lang),
    description: withLanguage(this._questionnaire?.description, this._lang),
    showIntroduction: this._questionnaire?.showIntroduction ?? 'no',
    startText: withLanguage(this._questionnaire?.startText, this._lang),
    endText: withLanguage(this._questionnaire?.endText, this._lang),
    warningEnabled: this._questionnaire?.warningEnabled ?? false,
    warn: withLanguage(this._questionnaire?.warn, this._lang),
  });

  protected form = form(this.model);

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.store.selected());
      const updated = {
        ...entity,
        ...model,
        isCustomMessagesTabValid: this.form().valid()
      } as AppQuestionnaire;
      this.store.selected.set(updated);
    });
  }
}

export function withLanguage(
  value: Record<string, string> | undefined,
  lang: string,
): Record<string, string> {
  return {
    ...value,
    [lang]: value?.[lang] ?? '',
  };
}
