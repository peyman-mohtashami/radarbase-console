import {Component, effect, inject, signal, untracked} from '@angular/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {
  AppQuestionnaire, AppQuestionnaireLanguage, DEFAULT_LANGUAGE,
  ISO_LANGUAGES
} from '../../../../models/questionnaire';
import {form, FormField, validate} from '@angular/forms/signals';
import {
  identifierField,
  requiredField,
  validateDuplicate
} from '../../../../../../../shared/utils/signal-form-validators';
import {
  SearchableMultiSelectComponent
} from '../../../../../../../shared/components/searchable-multi-select/searchable-multi-select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
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
  ]
})
export class QuestionnaireGeneralComponent {
  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  protected store = inject(QuestionnaireStore);

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
    editEnabled: this._questionnaire?.editEnabled ?? true,
    previousEnabled: this._questionnaire?.previousEnabled ?? true,
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    validateDuplicate(schema.name, this.store.allItems(), this._questionnaire, 'name');
    identifierField(schema.name);

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
