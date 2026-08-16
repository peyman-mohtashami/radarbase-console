import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {applyWhen, form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {UNITS} from '../questionnaire-scheduling/questionnaire-scheduling.component';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {withLanguage} from '../questionnaire-custom-messages/questionnaire-custom-messages.component';
import {requiredField} from '../../../../../../../shared/utils/signal-form-validators';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';

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
    CdkTextareaAutosize,
  ]
})
export class QuestionnaireNotificationsComponent {
  protected store = inject(QuestionnaireStore);

  protected readonly UNITS = UNITS;

  lang = computed(() => {
    return this.store.selected()!.defaultLanguage!.code;
  });

  _schedule = this.store.selected()?.schedule;
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
