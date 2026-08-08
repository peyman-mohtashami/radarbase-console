import {Component, effect, inject, output, signal, untracked} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDivider} from '@angular/material/list';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {LocaleService} from '../../../../../../../core/locale/services/locale.service';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {
  TimeFromZeroFormArrayComponent
} from './time-from-zero-form-array/time-from-zero-form-array.component';
import {UNITS} from '../../models/unit';
import {requiredField} from '../../../../../../../shared/utils/signal-form-validators';
import {applyEach, applyWhen, form, FormField} from '@angular/forms/signals';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {moveItemInFormArray} from '../../questionnaire-dialog.component';
import {AppQuestionnaire} from '../../../../models/questionnaire';

export interface QuestionnaireSchedulingForm {
  onDemand: boolean;
  relativeToReferenceTime: boolean;
  referenceTimestamp: string;
  repeatedProtocol: boolean;
  repeatProtocol: {
    unit: string;
    amount: string;
  };
  repeatQuestionnaire: {
    // unit: string;
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
    // TimeFromZeroFormArrayComponent,
    TranslatePipe,
    MatError,
    FormField,
    CdkDrag,
    CdkDropList,
    FormsModule,
    MatIcon,
    MatIconButton
  ]
})
export class QuestionnaireSchedulingComponent {
  protected readonly UNITS = UNITS;

  protected dialogState = inject(QuestionnaireDialogStateService);
  localeService = inject(LocaleService);

  protected model = signal<QuestionnaireSchedulingForm>({//this.dialogData.restoredModel ?? {
    ...this.dialogState.questionnaire()?.schedule,
    onDemand: this.dialogState.questionnaire()?.schedule?.onDemand ?? false,
    relativeToReferenceTime: this.dialogState.questionnaire()?.schedule?.relativeToReferenceTime ?? false,
    referenceTimestamp: this.dialogState.questionnaire()?.schedule?.referenceTimestamp ?? '',
    repeatedProtocol: this.dialogState.questionnaire()?.schedule?.repeatedProtocol ?? false,
    repeatProtocol: {
      unit: this.dialogState.questionnaire()?.schedule?.repeatProtocol?.unit ?? '',
      amount: this.dialogState.questionnaire()?.schedule?.repeatProtocol?.amount ?? '',
    },
    repeatQuestionnaire: {
      // unit: this.dialogState.questionnaire()?.schedule?.repeatQuestionnaire?.unit ?? '',
      unitsFromZero: this.convertUnitFromTimeZero(this.dialogState.questionnaire()?.schedule?.repeatQuestionnaire?.unitsFromZero) ?? [{day: '0', time: ''}],
    },
    completionWindow: {
      unit: this.dialogState.questionnaire()?.schedule?.completionWindow?.unit ?? '',
      amount: this.dialogState.questionnaire()?.schedule?.completionWindow?.amount ?? '',
    },
  });



  protected form = form(this.model, (schema) => {
    applyWhen(schema, ({valueOf}) => !valueOf(schema.onDemand),
      (schemaPath) => {
        requiredField(schemaPath.repeatQuestionnaire.unitsFromZero);
        applyEach(schemaPath.repeatQuestionnaire.unitsFromZero, (item) => {
          requiredField(item.day);
          requiredField(item.time);
        })

        requiredField(schemaPath.completionWindow.amount);
        requiredField(schemaPath.completionWindow.unit);
      },
    );
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
      const entity = untracked(() => this.dialogState.questionnaire());
      const updated = {
        ...entity,
        schedule: {
          ...entity?.schedule,
          onDemand: model.onDemand,
          relativeToReferenceTime: model.relativeToReferenceTime,
          referenceTimestamp: model.referenceTimestamp,
          repeatedProtocol: model.repeatedProtocol,
          repeatProtocol: {
            unit: model.repeatProtocol.unit,
            amount: model.repeatProtocol.amount,
          },
          repeatQuestionnaire: {
            unit: 'min',
            unitsFromZero: this.convertUnitFromTimeZero2(model.repeatQuestionnaire.unitsFromZero), //{day: string; time: string;}[];
          },
          completionWindow: {
            unit: model.completionWindow.unit,
            amount: model.completionWindow.amount,
          },
        },
        isSchedulingTabValid: this.form().valid()
      } as AppQuestionnaire;
      console.log('Class: QuestionnaireSchedulingComponent, Function: , Line 149 updated' , updated);
      this.dialogState.questionnaire.set({...updated});
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
    // moveItemInFormArray(this.form, event.previousIndex, event.currentIndex);
  }

  convertUnitFromTimeZero(offsets?: string[]) {
    if (!offsets) return undefined;
    return [{day: '0', time: ''}]
  }

  convertUnitFromTimeZero2(offsets: { day: string; time: string; }[]): string[] {
    return offsets.map(o => `${(Number(o.day) * 1000) + Number(o.time)}`);
  }
}
