import {Component, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {
  requiredField, validateTemplateVariables
} from '../../../../../../../shared/utils/signal-form-validators';
import {withLanguage} from '../../services/utils';
import {
  RichTextEditorComponent
} from '../../../../../../../shared/components/rich-text-editor/rich-text-editor.component';
// import {HtmlEditorComponent} from '../../../../../../../shared/components/html-editor/html-editor.component';

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
    RichTextEditorComponent,
    // HtmlEditorComponent,
  ]
})
export class QuestionnaireCustomMessagesComponent {
  protected store = inject(QuestionnaireStore);

  _questionnaire = this.store.selected()!;
  _lang = this._questionnaire.defaultLanguage.code;

  protected model = signal<QuestionnaireCustomMessagesForm>({//this.dialogData.restoredModel ?? {
    title: withLanguage(this._questionnaire?.title, this._lang),
    description: withLanguage(this._questionnaire?.description, this._lang),
    showIntroduction: this._questionnaire?.showIntroduction ?? 'no',
    startText: withLanguage(this._questionnaire?.startText, this._lang),
    endText: withLanguage(this._questionnaire?.endText, this._lang),
    warningEnabled: this._questionnaire?.warningEnabled ?? false,
    warn: withLanguage(this._questionnaire?.warn, this._lang),
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.startText[this._lang], {when: ({valueOf}) => valueOf(schema.showIntroduction) !== 'no'});
    validateTemplateVariables(schema.startText[this._lang], () => this.store.selected());
    validateTemplateVariables(schema.endText[this._lang], () => this.store.selected());
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

