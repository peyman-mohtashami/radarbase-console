import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {form, FormField, PathKind, SchemaPath, SchemaPathRules, validate} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {
  QuestionTemplateVariablesComponent
} from '../questionnaire-questions/dialogs/question-dialog/question-template-variables/question-template-variables.component';
import {QuestionTemplateVariable} from '../questionnaire-variables/model/template-field.model';
import {
  parseAndValidateTemplateVariables,
  requiredField, RequiredWhen
} from '../../../../../../../shared/utils/signal-form-validators';

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
    QuestionTemplateVariablesComponent,
  ]
})
export class QuestionnaireCustomMessagesComponent {
  protected store = inject(QuestionnaireStore);

  lang = computed(() => {
    return this.store.selected()!.defaultLanguage.code;
  });

  _questionnaire = this.store.selected()!;
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

  protected form = form(this.model, (schema) => {
    requiredField(schema.startText[this._lang], {when: ({valueOf}) => valueOf(schema.showIntroduction) !== 'no'});
    // this.validateTemplateVariables(schema.startText[this.lang()], 'startText');
    // this.validateTemplateVariables(schema.endText[this.lang()], 'endText');
  });

  // variables: Record<string, QuestionTemplateVariable[]> = this._questionnaire.variables ?? {};

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

  // protected updateVariables(field: string, variables: QuestionTemplateVariable[]) {
  //   this.variables = {
  //     ...this.variables,
  //     [field]: variables
  //   }
  // }
  //
  // private validateTemplateVariables<TValue, TPathKind extends PathKind = PathKind.Root>(
  //   path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>, field: string): void {
  //   validate(path, ({value}) => {
  //     const _variables = parseAndValidateTemplateVariables(value() as string, field, this.variables);
  //     if (_variables) {
  //       this.variables = {
  //         ...this.variables,
  //         [field]: _variables
  //       }
  //       return null;
  //     }
  //
  //     return {
  //       kind: 'wrongTemplateVariable',
  //       message: 'SHARED.validatorError.wrongTemplateVariable',
  //     };
  //   });
  // }
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
