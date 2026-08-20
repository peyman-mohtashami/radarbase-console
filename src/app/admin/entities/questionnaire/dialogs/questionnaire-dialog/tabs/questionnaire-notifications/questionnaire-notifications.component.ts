import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {applyWhen, form, FormField, PathKind, SchemaPath, SchemaPathRules, validate} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {UNITS} from '../questionnaire-scheduling/questionnaire-scheduling.component';
import {withLanguage} from '../questionnaire-custom-messages/questionnaire-custom-messages.component';
import {
  parseAndValidateTemplateVariables,
  requiredField
} from '../../../../../../../shared/utils/signal-form-validators';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {QuestionTemplateVariable} from '../questionnaire-variables/model/template-field.model';
import {
  QuestionTemplateVariablesComponent
} from '../questionnaire-questions/dialogs/question-dialog/question-template-variables/question-template-variables.component';

export interface QuestionnaireNotificationsForm {
  notification: {
    title: Record<string, string>;
    text: Record<string, string>;
  };
  reminders: {
    enabled: boolean;
    unit: string;
    amount: string;
    repeat: string;
  };
}

@Component({
  selector: 'app-questionnaire-notifications',
  templateUrl: 'questionnaire-notifications.component.html',
  imports: [
    TranslatePipe,
    MatSlideToggle,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    FormField,
    MatError,
    QuestionTemplateVariablesComponent,
  ]
})
export class QuestionnaireNotificationsComponent {
  protected store = inject(QuestionnaireStore);

  protected readonly UNITS = UNITS;

  lang = computed(() => {
    return this.store.selected()!.defaultLanguage.code;
  });

  _schedule = this.store.selected()!.schedule;
  _lang = this.lang();

  protected model = signal<QuestionnaireNotificationsForm>({//this.dialogData.restoredModel ?? {
    ...this._schedule,
    notification: {
      title: withLanguage(this._schedule?.notification?.title, this._lang),
      text: withLanguage(this._schedule?.notification?.text, this._lang),
    },
    reminders: {
      enabled: this._schedule?.reminders?.enabled ?? false,
      unit: this._schedule?.reminders?.unit ?? '',
      amount: this._schedule?.reminders?.amount ?? '',
      repeat: this._schedule?.reminders?.repeat ?? '',
    }
  });

  protected form = form(this.model, (schema) => {
    this.validateTemplateVariables(schema.notification.title[this._lang], 'notificationTitle');
    this.validateTemplateVariables(schema.notification.text[this._lang], 'notificationText');

    applyWhen(schema, ({valueOf}) => valueOf(schema.reminders.enabled),
      (schemaPath) => {
        requiredField(schemaPath.reminders.repeat);
        requiredField(schemaPath.reminders.amount);
        requiredField(schemaPath.reminders.unit);
      },
    );
  });

  variables: Record<string, QuestionTemplateVariable[]> = this.store.selected()!.variables ?? {};

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.store.selected());

      const updated = {
        ...entity,
        schedule: {
          ...entity?.schedule,
          notification: model.notification,
          reminders: model.reminders,
        },
        isNotificationsTabValid: this.form().valid()
      } as AppQuestionnaire;
      this.store.selected.set(updated);
    });
  }

  protected updateVariables(field: string, variables: QuestionTemplateVariable[]) {
    this.variables = {
      ...this.variables,
      [field]: variables
    }
  }

  private validateTemplateVariables<TValue, TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>, field: string): void {
    validate(path, ({value}) => {
      const _variables = parseAndValidateTemplateVariables(value() as string, field, this.variables);
      if (_variables) {
        this.variables = {
          ...this.variables,
          [field]: _variables
        }
        return null;
      }

      return {
        kind: 'wrongTemplateVariable',
        message: 'SHARED.validatorError.wrongTemplateVariable',
      };
    });
  }
}
