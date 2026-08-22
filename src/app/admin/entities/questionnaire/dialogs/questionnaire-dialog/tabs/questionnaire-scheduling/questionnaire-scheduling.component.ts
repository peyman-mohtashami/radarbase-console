import {Component, effect, inject, signal, untracked} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDivider} from '@angular/material/list';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {LocaleService} from '../../../../../../../core/locale/services/locale.service';
import {requiredField} from '../../../../../../../shared/utils/signal-form-validators';
import {applyEach, applyWhen, form, FormField} from '@angular/forms/signals';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {dragDropStyles, minuteToOffset, moveItemInFormArray, offsetToMinute} from '../../services/utils';

export const UNITS = [
  { name: 'min', label: 'Minute' },
  { name: 'hour', label: 'Hour' },
  { name: 'day', label: 'Day' },
  { name: 'week', label: 'Week' },
  { name: 'month', label: 'Month' },
  { name: 'year', label: 'Year' },
];


export interface QuestionnaireSchedulingForm {
  relativeToReferenceTime: boolean;
  referenceTimestamp: string;
  repeatedProtocol: boolean;
  repeatProtocol: {
    unit: string;
    amount: string;
  };
  repeatQuestionnaire: {
    unit: string;
    unitsFromZero: {day: string; time: string;}[];
  };
  completionWindow: {
    unit: string;
    amount: string;
  };
}

@Component({
  selector: 'app-questionnaire-scheduling',
  templateUrl: 'questionnaire-scheduling.component.html',
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDivider,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    MatSlideToggle,
    MatSuffix,
    TranslatePipe,
    MatError,
    FormField,
    CdkDrag,
    CdkDropList,
    FormsModule,
    MatIcon,
    MatIconButton
  ],
  styles: dragDropStyles
})
export class QuestionnaireSchedulingComponent {
  protected readonly UNITS = UNITS;

  protected store = inject(QuestionnaireStore);
  localeService = inject(LocaleService);

  _schedule = this.store.selected()?.schedule;

  protected model = signal<QuestionnaireSchedulingForm>({//this.dialogData.restoredModel ?? {
    ...this._schedule,
    relativeToReferenceTime: this._schedule?.relativeToReferenceTime ?? false,
    referenceTimestamp: this._schedule?.referenceTimestamp ?? '',
    repeatedProtocol: this._schedule?.repeatedProtocol ?? false,
    repeatProtocol: {
      unit: this._schedule?.repeatProtocol?.unit ?? '',
      amount: this._schedule?.repeatProtocol?.amount ?? '',
    },
    repeatQuestionnaire: {
      unit: 'min',
      unitsFromZero: this.minutesToOffsets(this._schedule?.repeatQuestionnaire?.unitsFromZero) ?? [{day: '0', time: ''}],
    },
    completionWindow: {
      unit: this._schedule?.completionWindow?.unit ?? '',
      amount: this._schedule?.completionWindow?.amount ?? '',
    },
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.repeatQuestionnaire.unitsFromZero);
    applyEach(schema.repeatQuestionnaire.unitsFromZero, (item) => {
      requiredField(item.day);
      requiredField(item.time);
    })

    requiredField(schema.completionWindow.amount);
    requiredField(schema.completionWindow.unit);


    applyWhen(schema, ({valueOf}) => valueOf(schema.relativeToReferenceTime),
      (schemaPath) => {
        requiredField(schemaPath.referenceTimestamp);
      },
    );
    applyWhen(schema, ({valueOf}) => valueOf(schema.repeatedProtocol),
      (schemaPath) => {
        requiredField(schemaPath.repeatProtocol.amount);
        requiredField(schemaPath.repeatProtocol.unit);
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
          ...model,
          repeatQuestionnaire: {
            unit: 'min',
            unitsFromZero: this.offsetsToMinutes(model.repeatQuestionnaire.unitsFromZero), //{day: string; time: string;}[];
          },
        },
        isSchedulingTabValid: this.form().valid()
      } as AppQuestionnaire;

      // if (!updated.schedule?.repeatedProtocol) {
      //   delete updated.schedule?.repeatProtocol;
      // }
      //
      // if (!updated.schedule?.relativeToReferenceTime) {
      //   delete updated.schedule?.referenceTimestamp;
      // }
      this.store.selected.set({...updated});
    });
  }

  addTime() {
    this.model.update(model => ({
      ...model,
      repeatQuestionnaire: {
        ...model.repeatQuestionnaire,
        unitsFromZero: [...model.repeatQuestionnaire.unitsFromZero, {day: '0', time: ''}],
      }
    }))
  }

  removeTime(index: number) {
    this.model.update(model => ({
      ...model,
      repeatQuestionnaire: {
        ...model.repeatQuestionnaire,
        unitsFromZero: model.repeatQuestionnaire.unitsFromZero.filter((_, i) => i !== index),
      }
    }))
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInFormArray(this.form.repeatQuestionnaire.unitsFromZero, event.previousIndex, event.currentIndex);
  }

  minutesToOffsets(minutes?: string[]): { day: string; time: string; }[] {
    // if (!minutes) return undefined;
    return minutes?.map(m => minuteToOffset(Number(m))) ?? [];
    // return [{day: '0', time: ''}]
  }

  offsetsToMinutes(offsets: { day: string; time: string; }[]): string[] {
    return offsets.map(o => `${offsetToMinute(o.day, o.time)}`); //`${(Number(o.day) * ) + Number(o.time)}`);
  }
}

