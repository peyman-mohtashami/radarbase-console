import {Component, input} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  moveItemInFormArray
} from "../../../../../../questionnaire/containers/questionnaire-dialog/questionnaire-dialog.component";
import {Validator as CustomValidator} from "../../../../../../../../shared/utils/validators";
import {map} from "rxjs/operators";
import {QuestionnaireTimeUnit} from "../../../../../models/protocol";
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-time-from-zero-form-array',
  templateUrl: './time-from-zero-form-array.component.html',
  imports: [
    CdkDropList,
    CdkDrag,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIconButton,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TimeFromZeroFormArrayComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TimeFromZeroFormArrayComponent
    }
  ],
})
export class TimeFromZeroFormArrayComponent implements ControlValueAccessor, Validator {
  unit = input<QuestionnaireTimeUnit | null | undefined>(QuestionnaireTimeUnit.min);

  form = new FormArray<FormGroup<{
    day: FormControl<number | null>;
    time: FormControl<string | null>;
  }>>([]);

  onChange = () => {};
  onTouch = () => {};

  validate(): ValidationErrors | null {
    const errors: ValidationErrors = {};

    // Check main form controls
    Object.keys(this.form.controls).forEach(key => {
      const ctrl = this.form.get(key);
      if (ctrl?.errors) {
        errors[key] = ctrl.errors;
      }

      // Check nested form groups
      if (ctrl instanceof FormGroup) {
        Object.keys(ctrl.controls).forEach(nestedKey => {
          const nestedCtrl = ctrl.get(nestedKey);
          if (nestedCtrl?.errors) {
            errors[`${key}.${nestedKey}`] = nestedCtrl.errors;
          }

          // Handle nested form groups (like timer)
          if (nestedCtrl instanceof FormGroup) {
            Object.keys(nestedCtrl.controls).forEach(deepKey => {
              const deepCtrl = nestedCtrl.get(deepKey);
              if (deepCtrl?.errors) {
                errors[`${key}.${nestedKey}.${deepKey}`] = deepCtrl.errors;
              }
            });
          }
        });
      }
    });

    return Object.keys(errors).length > 0 ? errors : null;
  }

  writeValue(times: number[] | null | undefined) {
    this.form.clear();

    if (!times || times.length === 0) {
      this.addItem();
    } else {
      times.forEach(time => this.addItem(time));
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.form.valueChanges
      .pipe(
        map(values =>
          values
            .map(v => dayTimeToMinutes({ day: v.day ?? 0, time: v.time ?? '' }))
            .filter((x): x is number => x != null)
        )
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  addItem(minutes?: number) {
    switch (this.unit()) {
      case QuestionnaireTimeUnit.hour:
        minutes = minutes !== undefined ? minutes * 60 : undefined;
        break;
    }
    const day = minutes ? Math.floor((minutes) / (24 * 60)) : 0;
    const minutesFromMidnight = minutes ? minutes % (24 * 60) : null;
    const hour = Math.floor((minutesFromMidnight ?? 0) / 60);
    const minute = (minutesFromMidnight ?? 0) % 60;
    const time = minutesFromMidnight !== null ? `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}` : '';
    this.form.push(new FormGroup({
      day: new FormControl(day, {validators: [CustomValidator.requiredValidator]}),
      time: new FormControl(time, {validators: [CustomValidator.requiredValidator]}),
    }));
  }

  removeItem(index: number) {
    this.form.removeAt(index);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInFormArray(this.form, event.previousIndex, event.currentIndex);
  }
}

function dayTimeToMinutes(input: { day: number | null | undefined; time: string | null | undefined }): number | null {
  if (input == null) return null;
  const day = Number(input.day ?? 0);
  const time = (input.time ?? '').trim();
  if (!time) return null; // or return 0 if you prefer a default

  const [hStr, mStr] = time.split(':');
  const hours = Number(hStr);
  const minutes = Number(mStr);

  if (!Number.isFinite(day) || !Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return day * 24 * 60 + hours * 60 + minutes;
}

// function minutesToDayTime(totalMinutes: number): { day: number; time: string } {
//   const day = Math.floor(totalMinutes / 1440); // 24 * 60
//   const minutesFromMidnight = totalMinutes % 1440;
//   const hours = Math.floor(minutesFromMidnight / 60);
//   const minutes = minutesFromMidnight % 60;
//   const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//   return { day, time };
// }
