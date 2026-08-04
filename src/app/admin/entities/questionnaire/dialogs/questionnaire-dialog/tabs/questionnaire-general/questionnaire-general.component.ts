import {Component, effect, inject, input, output, signal, untracked} from '@angular/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {
  AppQuestionnaire,
  AppQuestionnaireLanguage,
  DEFAULT_LANGUAGE,
  ISO_LANGUAGES
} from '../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {form, FormField, validate} from '@angular/forms/signals';
import {requiredField} from '../../../../../../../shared/utils/signal-form-validators';
import {
  SearchableMultiSelectComponent
} from '../../../../../../../shared/components/searchable-multi-select/searchable-multi-select';

export interface QuestionnaireGeneralForm {
  name: string;
  defaultLanguage: string;
  title: string;
  description: string;
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
  ]
})
export class QuestionnaireGeneralComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;

  questionnaires = input.required<AppQuestionnaire[] | null>();

  valid = output<boolean>();

  protected model = signal<QuestionnaireGeneralForm>({//this.dialogData.restoredModel ?? {
    ...this.dialogState.questionnaire(),
    name: this.dialogState.questionnaire()?.name ?? '',
    defaultLanguage: this.dialogState.questionnaire()?.defaultLanguage.code ?? 'en',
    title: this.dialogState.questionnaire()?.title?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
    description: this.dialogState.questionnaire()?.description?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    // TODO DUPLICATE validate()
    // TODO stringId
    // requiredField(schema.defaultLanguage);
    validate(schema.defaultLanguage, ({value}) => {
      if (value().length) return null;
      return {
        kind: 'required',
        message: 'SHARED.validatorError.required',
      };
    });
  });

  languages: AppQuestionnaireLanguage[] = [DEFAULT_LANGUAGE];

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.dialogState.questionnaire());
      let languages = entity?.languages ?? [];
      const defaultLanguage = ISO_LANGUAGES.find(l => l.code === model.defaultLanguage[0]);
      if (!defaultLanguage) return;

      const questionnaireDefaultLanguage = entity?.languages.find(l => l.code === defaultLanguage.code);
      if (!questionnaireDefaultLanguage) {
        languages = [...entity?.languages ?? [], defaultLanguage];
      }

      const updated = {
        ...entity,
        name: model.name,
        defaultLanguage: defaultLanguage,
        title: {...entity?.title, [defaultLanguage.code]: model.title},
        description: {...entity?.description, [defaultLanguage.code]: model.description},
        languages
      } as AppQuestionnaire;
      this.dialogState.questionnaire.set(updated);
      this.valid.emit(this.form().valid());
    });
  }
}
