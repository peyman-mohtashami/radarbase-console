import {Component, effect, inject, output, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {UNITS} from '../../models/unit';
import {form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';

export interface QuestionnaireNotificationsForm {
  notification: {
    title: string;
    text: string;
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
  ]
})
export class QuestionnaireNotificationsComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly UNITS = UNITS;

  valid = output<boolean>();

  protected model = signal<QuestionnaireNotificationsForm>({//this.dialogData.restoredModel ?? {
    ...this.dialogState.questionnaire()?.schedule,
    notification: {
      title: this.dialogState.questionnaire()?.schedule?.notification?.title?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
      text: this.dialogState.questionnaire()?.schedule?.notification?.text?.[this.dialogState.questionnaire()!.defaultLanguage.code] ?? '',
    },
    reminders: {
      enabled: this.dialogState.questionnaire()?.schedule?.reminders?.enabled ?? false,
      unit: this.dialogState.questionnaire()?.schedule?.reminders?.unit ?? '',
      amount: this.dialogState.questionnaire()?.schedule?.reminders?.amount ?? '',
      repeat: this.dialogState.questionnaire()?.schedule?.reminders?.repeat ?? '',
    }
  });

  protected form = form(this.model, (schema) => {

  });

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.dialogState.questionnaire());
      const defaultLanguage = entity?.defaultLanguage;
      if (!defaultLanguage) return;

      const updated = {
        ...entity,
        schedule: {
          ...entity?.schedule,
          notification: {
            title: {
              ...entity.schedule?.notification?.title,
              [defaultLanguage.code]: model.notification.title,
            },
            text: {
              ...entity.schedule?.notification?.text,
              [defaultLanguage.code]: model.notification.text,
            }
          },
          reminders: {
            ...entity.schedule?.reminders,
            enabled: model.reminders.enabled,
            repeat: model.reminders.repeat,
            unit: model.reminders.unit,
            amount: model.reminders.amount,
          }
        }
      } as AppQuestionnaire;
      this.dialogState.questionnaire.set(updated);
      this.valid.emit(this.form().valid());
    });
  }
}
