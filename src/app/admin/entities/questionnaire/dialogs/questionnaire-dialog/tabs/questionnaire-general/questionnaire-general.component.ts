import {Component, effect, inject, signal, untracked} from '@angular/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {
  AppQuestionnaire,
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

  protected model = signal<QuestionnaireGeneralForm>({//this.dialogData.restoredModel ?? {
    ...this.dialogState.questionnaire(),
    name: this.dialogState.questionnaire()?.name ?? '',
    defaultLanguage: this.dialogState.questionnaire()?.defaultLanguage.code ?? 'en',
    title: this.dialogState.questionnaire()?.title?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
    description: this.dialogState.questionnaire()?.description?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.name);
    // TODO
    // validate(schema.name, ({value}) => {
    //   const matchedQuestionnaireName = this.dialogState.questionnaires()?.find((questionnaire) => questionnaire.name === value());
    //   if (!matchedQuestionnaireName) return null;
    //   if (this.dialogState.questionnaire()?.name === value()) return null;
    //   return {
    //     kind: 'duplicate',
    //     message: 'SHARED.validatorError.duplicateName',
    //   };
    // });
    // TODO stringId
    validate(schema.defaultLanguage, ({value}) => {
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
      const entity = untracked(() => this.dialogState.questionnaire());
      let languages = entity?.languages ?? [];
      const defaultLanguage = ISO_LANGUAGES.find(l => l.code === model.defaultLanguage);
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
        languages,
        isGeneralTabValid: this.form().valid(),
      } as AppQuestionnaire;
      this.dialogState.questionnaire.set(updated);
    });
  }
}
