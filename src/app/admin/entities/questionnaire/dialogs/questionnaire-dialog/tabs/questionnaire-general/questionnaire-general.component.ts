import {Component, effect, inject, signal, untracked} from '@angular/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {
  AppQuestionnaire, AppQuestionnaireLanguage, DEFAULT_LANGUAGE,
  ISO_LANGUAGES
} from '../../../../models/questionnaire';
import {form, FormField, validate} from '@angular/forms/signals';
import {requiredField} from '../../../../../../../shared/utils/signal-form-validators';
import {
  SearchableMultiSelectComponent
} from '../../../../../../../shared/components/searchable-multi-select/searchable-multi-select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {JsonPipe} from '@angular/common';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';

export interface QuestionnaireGeneralForm {
  name: string;
  defaultLanguage: AppQuestionnaireLanguage;
  languages: AppQuestionnaireLanguage[];
  onDemand: boolean;
  isDemo: boolean;
  estimatedCompletionTime: string;
  order: string;
  showInCalendar: boolean;
  autoNextEnabled: boolean;
  editEnabled: boolean;
  previousEnabled: boolean;
}

@Component({
  selector: 'app-questionnaire-general',
  templateUrl: './questionnaire-general.component.html',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    TranslatePipe,
    FormField,
    SearchableMultiSelectComponent,
    MatSlideToggle,
    JsonPipe,
  ]
})
export class QuestionnaireGeneralComponent {
  protected store = inject(QuestionnaireStore);

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  _questionnaire = this.store.selected();

  protected model = signal<QuestionnaireGeneralForm>({//this.dialogData.restoredModel ?? {
    ...this._questionnaire,
    name: this._questionnaire?.name ?? '',
    defaultLanguage: this._questionnaire?.defaultLanguage ?? DEFAULT_LANGUAGE,
    languages: this._questionnaire?.languages ?? [DEFAULT_LANGUAGE],
    onDemand: this._questionnaire?.onDemand ?? false,
    isDemo: this._questionnaire?.isDemo ?? false,
    estimatedCompletionTime: this._questionnaire?.estimatedCompletionTime ?? '',
    order: this._questionnaire?.order ?? '',
    showInCalendar: this._questionnaire?.showInCalendar ?? false,
    autoNextEnabled: this._questionnaire?.autoNextEnabled ?? false,
    editEnabled: this._questionnaire?.editEnabled ?? false,
    previousEnabled: this._questionnaire?.previousEnabled ?? false,
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    validate(schema.name, ({value}) => {
      const matchedQuestionnaireName = this.store.allItems()?.find((questionnaire) => questionnaire.name === value());
      if (!matchedQuestionnaireName) return null;
      if (this._questionnaire?.name === value()) return null;
      return {
        kind: 'duplicate',
        message: 'SHARED.validatorError.duplicateName',
      };
    });
    // TODO stringId
    requiredField(schema.defaultLanguage);
    validate(schema.languages, ({value}) => {
      if (value().length) return null;
      return {
        kind: 'required',
        message: 'SHARED.validatorError.required',
      };
    });
  });

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.store.selected());
      const updated = {...entity, ...model, isGeneralTabValid: this.form().valid()} as AppQuestionnaire;
      this.store.selected.set(updated);
    });
  }
}
