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
import {applyEach, applyWhen, FieldTree, form, FormField} from '@angular/forms/signals';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';

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
  styles: `
    .cdk-drag-preview {
      background: white;
      border-radius: 8px;
      box-shadow:
        0 5px 5px -3px rgb(0 0 0 / 20%),
        0 8px 10px 1px rgb(0 0 0 / 14%),
        0 3px 14px 2px rgb(0 0 0 / 12%);
    }

    .cdk-drag-placeholder {
      background: #f3f4f6;
      border: 2px dashed #9ca3af;
      border-radius: 8px;
      opacity: 0.6;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drop-list-dragging .cdk-drag:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `
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
      console.log('Class: QuestionnaireSchedulingComponent, Function: , Line 171 updated' , updated);
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

function minuteToOffset(minute: number) {
  const day = Math.floor(minute / (24 * 60));
  const remainingMinutes = minute % (24 * 60);

  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  return {
    day: String(day),
    time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
  };
}

function offsetToMinute(day: string, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return Number(day) * 24 * 60 + hours * 60 + minutes;
}

export function moveItemInFormArray<T>(
  arrayField: FieldTree<T[]>,
  fromIndex: number,
  toIndex: number
): void {
  arrayField().value.update(items => {
    const reordered = [...items];
    moveItemInArray(reordered, fromIndex, toIndex);
    return reordered;
  });
}
