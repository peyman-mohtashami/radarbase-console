import {Component, effect, inject, input, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Validator as CustomValidator} from '../../../../../../../../shared/utils/validators';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDivider} from '@angular/material/list';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {
  TimeFromZeroFormArrayComponent
} from '../../../../../protocol/containers/protocol-dialog/components/custom-form-controls/time-from-zero-form-array/time-from-zero-form-array.component';
import {UNITS} from '../../../../../protocol/containers/protocol-dialog/models/unit';
import {AppQuestionnaire} from '../../../../models/questionnaire';
import {LocaleService} from '../../../../../../../../core/locale/services/locale.service';
import {Subscription} from 'rxjs';

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
    ReactiveFormsModule,
    TimeFromZeroFormArrayComponent,
    TranslatePipe
  ]
})
export class QuestionnaireSchedulingComponent implements OnInit {
  protected readonly UNITS = UNITS;

  entity = input<AppQuestionnaire | undefined>();
  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  localeService = inject(LocaleService);

  form = new FormGroup({
    schedule: new FormGroup({
      onDemand: new FormControl<boolean>(false, {nonNullable: true}),
      relativeToReferenceTime: new FormControl<boolean>(false, {nonNullable: true}),
      referenceTimestamp: new FormControl<string>('', {nonNullable: true}),
      repeatedProtocol: new FormControl<boolean>(false, {nonNullable: true}),
      repeatProtocol: new FormGroup({
        unit: new FormControl<string>('', {nonNullable: true}),
        amount: new FormControl<string>('', {nonNullable: true}),
      }),
      repeatQuestionnaire: new FormGroup({
        unit: new FormControl<string>('', {nonNullable: true}),
        unitsFromZero: new FormControl<string[]>([], {nonNullable: true}),
      }),
      completionWindow: new FormGroup({
        unit: new FormControl<string>('', {nonNullable: true}),
        amount: new FormControl<string>('', {nonNullable: true}),
      }),
    })
  });

  private subscription?: Subscription;

  protected readonly onDemandValueChanges = toSignal(
    this.form.controls.schedule.controls.onDemand.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.schedule.controls.onDemand.getRawValue()}
  );

  protected readonly relativeToReferenceTimeValueChanges = toSignal(
    this.form.controls.schedule.controls.relativeToReferenceTime.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.schedule.controls.relativeToReferenceTime.getRawValue()}
  );

  protected readonly repeatedProtocolValueChanges = toSignal(
    this.form.controls.schedule.controls.repeatedProtocol.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.schedule.controls.repeatedProtocol.getRawValue()}
  );
  //
  // // protected readonly reminderEnabledValueChanges = toSignal(
  // //   this.form.controls.reminders.controls.enabled.valueChanges.pipe(debounceTime(300)),
  // //   {initialValue: this.form.controls.reminders.controls.enabled.getRawValue()}
  // // );
  //
  constructor() {
    effect(() => {
      const {referenceTimestamp, repeatProtocol, repeatQuestionnaire, completionWindow} = this.form.controls.schedule.controls;

      const relativeToReferenceTimeValue = this.relativeToReferenceTimeValueChanges();
      referenceTimestamp.setValidators(!relativeToReferenceTimeValue ? [] : [CustomValidator.requiredValidator]);
      referenceTimestamp.updateValueAndValidity({emitEvent: false});

      const repeatedProtocolValue = this.repeatedProtocolValueChanges();
      const {amount, unit} = repeatProtocol.controls;
      amount.setValidators(!repeatedProtocolValue ? [] : [CustomValidator.requiredValidator]);
      amount.updateValueAndValidity({emitEvent: false});
      unit.setValidators(!repeatedProtocolValue ? [] : [CustomValidator.requiredValidator]);
      unit.updateValueAndValidity({emitEvent: false});

      const onDemandValueChanges = this.onDemandValueChanges();
      const {unitsFromZero} = repeatQuestionnaire.controls;
      unitsFromZero.setValidators(!onDemandValueChanges ? [] : [CustomValidator.requiredValidator]);
      unitsFromZero.updateValueAndValidity({emitEvent: false});

      const {amount: completionWindowAmount, unit: completionWindowUnit} = completionWindow.controls;
      completionWindowAmount.setValidators(!onDemandValueChanges ? [] : [CustomValidator.requiredValidator]);
      completionWindowAmount.updateValueAndValidity({emitEvent: false});
      completionWindowUnit.setValidators(!onDemandValueChanges ? [] : [CustomValidator.requiredValidator]);
      completionWindowUnit.updateValueAndValidity({emitEvent: false});

      // const reminderEnabledValue = this.reminderEnabledValueChanges();
      // this.form.controls.reminders.controls.repeat.setValidators(!reminderEnabledValue ? [] : [CustomValidator.requiredValidator]);
      // this.form.controls.reminders.controls.repeat.updateValueAndValidity({emitEvent: false});
      // this.form.controls.reminders.controls.unit.setValidators(!reminderEnabledValue ? [] : [CustomValidator.requiredValidator]);
      // this.form.controls.reminders.controls.unit.updateValueAndValidity({emitEvent: false});
      // this.form.controls.reminders.controls.amount.setValidators(!reminderEnabledValue ? [] : [CustomValidator.requiredValidator]);
      // this.form.controls.reminders.controls.amount.updateValueAndValidity({emitEvent: false});
    });
  }

  ngOnInit() {
    const entity = this.entity();
    if (entity) {
      this.form.patchValue(entity);
    }

    this.valid.emit(this.form.valid);

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(0)
    ).subscribe(change => {
      this.changeEvent.emit(change);
      this.valid.emit(this.form.valid);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
