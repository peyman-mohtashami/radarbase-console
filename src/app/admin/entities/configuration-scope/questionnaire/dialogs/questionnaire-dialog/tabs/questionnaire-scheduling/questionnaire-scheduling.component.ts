import {Component, inject, output, signal} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDivider} from '@angular/material/list';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {LocaleService} from '../../../../../../../../core/locale/services/locale.service';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {
  TimeFromZeroFormArrayComponent
} from './time-from-zero-form-array/time-from-zero-form-array.component';
import {UNITS} from '../../models/unit';
import {requiredField} from '../../../../../../../../shared/utils/signal-form-validators';
import {applyEach, applyWhen, form, FormField} from '@angular/forms/signals';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {moveItemInFormArray} from '../../questionnaire-dialog.component';

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
  protected dialogState = inject(QuestionnaireDialogStateService);
  localeService = inject(LocaleService);

  protected readonly UNITS = UNITS;

  valid = output<boolean>();

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

  convertUnitFromTimeZero(offsets?: string[]) {
    if (!offsets) return undefined;
    return [{day: '0', time: ''}]
  }

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
}
