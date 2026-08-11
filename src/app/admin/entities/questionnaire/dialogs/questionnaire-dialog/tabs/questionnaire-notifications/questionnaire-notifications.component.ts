import {Component, computed, effect, inject, signal, untracked} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {form, FormField} from '@angular/forms/signals';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {UNITS} from '../questionnaire-scheduling/questionnaire-scheduling.component';

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
  ]
})
export class QuestionnaireNotificationsComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly UNITS = UNITS;

  lang = computed(() => {
    return this.dialogState.questionnaire()!.defaultLanguage!.code;
  });

  protected model = signal<QuestionnaireNotificationsForm>({//this.dialogData.restoredModel ?? {
    ...this.dialogState.questionnaire()?.schedule,
    notification: {
      title: this.dialogState.questionnaire()?.schedule?.notification?.title?.[this.lang()] ? this.dialogState.questionnaire()!.schedule!.notification!.title! : {...this.dialogState.questionnaire()?.schedule?.notification?.title, [this.lang()]: ''},
      text: this.dialogState.questionnaire()?.schedule?.notification?.text?.[this.lang()] ? this.dialogState.questionnaire()!.schedule!.notification!.text! : {...this.dialogState.questionnaire()?.schedule?.notification?.text, [this.lang()]: ''},
    },
    reminders: {
      enabled: this.dialogState.questionnaire()?.schedule?.reminders?.enabled ?? false,
      unit: this.dialogState.questionnaire()?.schedule?.reminders?.unit ?? '',
      amount: this.dialogState.questionnaire()?.schedule?.reminders?.amount ?? '',
      repeat: this.dialogState.questionnaire()?.schedule?.reminders?.repeat ?? '',
    }
  });

  protected form = form(this.model);

  constructor() {
    effect(() => {
      const model = this.model();
      const entity = untracked(() => this.dialogState.questionnaire());

      const updated = {
        ...entity,
        schedule: {
          ...entity?.schedule,
          notification: model.notification,
          reminders: model.reminders,
        },
        isNotificationsTabValid: this.form().valid()
      } as AppQuestionnaire;
      console.log('Class: QuestionnaireNotificationsComponent, Function: , Line 74 updated' , updated);
      this.dialogState.questionnaire.set(updated);
    });
  }
}
