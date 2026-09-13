import {Component, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {withLanguage} from '../../services/utils';
import {
  InputFormFieldComponent
} from '../../../../../../../shared/components/form-fields/input-form-field/input-form-field.component';
import {
  TextareaFormFieldComponent
} from '../../../../../../../shared/components/form-fields/textarea-form-field/textarea-form-field.component';

export interface QuestionnaireCustomMessagesForm {
  title: Record<string, string>;
  description: Record<string, string>;
  // showIntroduction: string;
  // startText: Record<string, string>;
  // endText: Record<string, string>;
  warningEnabled: boolean;
  warn: Record<string, string>;
}

@Component({
  selector: 'app-questionnaire-custom-messages',
  templateUrl: 'questionnaire-custom-messages.component.html',
  imports: [
    TranslatePipe,
    MatSlideToggle,
    FormField,
    InputFormFieldComponent,
    TextareaFormFieldComponent,
  ]
})
export class QuestionnaireCustomMessagesComponent {
  protected store = inject(QuestionnaireStore);

  _questionnaire = this.store.selected()!;
  _lang = this._questionnaire.defaultLanguage.code;

  protected model = signal<QuestionnaireCustomMessagesForm>({//this.dialogData.restoredModel ?? {
    title: withLanguage(this._questionnaire?.title, this._lang),
    description: withLanguage(this._questionnaire?.description, this._lang),
    // showIntroduction: this._questionnaire?.showIntroduction ?? 'no',
    // startText: withLanguage(this._questionnaire?.startText, this._lang),
    // endText: withLanguage(this._questionnaire?.endText, this._lang),
    warningEnabled: this._questionnaire?.warningEnabled ?? false,
    warn: withLanguage(this._questionnaire?.warn, this._lang),
  });

  protected form = form(this.model, (schema) => {
    // requiredField(schema.startText[this._lang], {when: ({valueOf}) => valueOf(schema.showIntroduction) !== 'no'});
    // validateTemplateVariables(schema.startText[this._lang], () => this.store.selected());
    // validateTemplateVariables(schema.endText[this._lang], () => this.store.selected());
  });

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

