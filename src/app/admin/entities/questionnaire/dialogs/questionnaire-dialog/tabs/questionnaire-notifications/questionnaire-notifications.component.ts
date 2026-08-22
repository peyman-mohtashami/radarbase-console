import {Component, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {applyWhen, form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {UNITS} from '../questionnaire-scheduling/questionnaire-scheduling.component';
import {
  requiredField, validateTemplateVariables
} from '../../../../../../../shared/utils/signal-form-validators';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {
  QuestionTemplateVariablesComponent
} from '../questionnaire-questions/dialogs/question-dialog/question-template-variables/question-template-variables.component';
import {withLanguage} from '../../services/utils';

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
  protected readonly UNITS = UNITS;

  protected store = inject(QuestionnaireStore);

  _questionnaire = this.store.selected()!;
  _schedule = this._questionnaire.schedule;
  _lang = this._questionnaire.defaultLanguage.code;

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
    validateTemplateVariables(schema.notification.title[this._lang], () => this.store.selected());
    validateTemplateVariables(schema.notification.title[this._lang], () => this.store.selected());

    applyWhen(schema, ({valueOf}) => valueOf(schema.reminders.enabled),
      (schemaPath) => {
        requiredField(schemaPath.reminders.repeat);
        requiredField(schemaPath.reminders.amount);
        requiredField(schemaPath.reminders.unit);
      },
    );
  });

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
}
