import {Component, inject, input, OnDestroy, OnInit, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Validator as CustomValidator} from '../../../../../../../../shared/utils/validators';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDivider} from '@angular/material/list';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
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
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';

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
    TranslatePipe,
    MatError
  ]
})
export class QuestionnaireSchedulingComponent implements OnInit, OnDestroy {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly UNITS = UNITS;

  // entity = input<AppQuestionnaire | undefined>();
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
        unit: new FormControl<string>('min', {nonNullable: true}),
        unitsFromZero: new FormControl<string[]>([], {nonNullable: true}),
      }),
      completionWindow: new FormGroup({
        unit: new FormControl<string>('', {nonNullable: true}),
        amount: new FormControl<string>('', {nonNullable: true}),
      }),
    })
  });

  private subscription?: Subscription;

  protected readonly onDemandValue = toSignal(
    this.form.controls.schedule.controls.onDemand.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.schedule.controls.onDemand.getRawValue()}
  );

  protected readonly relativeToReferenceTimeValue = toSignal(
    this.form.controls.schedule.controls.relativeToReferenceTime.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.schedule.controls.relativeToReferenceTime.getRawValue()}
  );

  protected readonly repeatedProtocolValue = toSignal(
    this.form.controls.schedule.controls.repeatedProtocol.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.schedule.controls.repeatedProtocol.getRawValue()}
  );

  protected loading = true;

  ngOnInit() {
    const entity = this.dialogState.selectedQuestionnaire();//entity();

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      this.loading = false;

      this.changeEvent.emit(change);

      const {referenceTimestamp, repeatProtocol, repeatQuestionnaire, completionWindow} = this.form.controls.schedule.controls;

      const onDemand = change.schedule?.onDemand;

      const {unitsFromZero} = repeatQuestionnaire.controls;
      unitsFromZero.setValidators(!onDemand ? [CustomValidator.requiredValidator] : []);
      unitsFromZero.updateValueAndValidity({emitEvent: false});

      const {amount: completionWindowAmount, unit: completionWindowUnit} = completionWindow.controls;
      completionWindowAmount.setValidators(!onDemand ? [CustomValidator.requiredValidator] : []);
      completionWindowAmount.updateValueAndValidity({emitEvent: false});
      completionWindowUnit.setValidators(!onDemand ? [CustomValidator.requiredValidator] : []);
      completionWindowUnit.updateValueAndValidity({emitEvent: false});

      const relativeToReferenceTime = change.schedule?.relativeToReferenceTime;
      referenceTimestamp.setValidators(!relativeToReferenceTime ? [] : [CustomValidator.requiredValidator]);
      referenceTimestamp.updateValueAndValidity({emitEvent: false});

      const repeatedProtocol = change.schedule?.repeatedProtocol;
      const {amount, unit} = repeatProtocol.controls;
      amount.setValidators(!repeatedProtocol ? [] : [CustomValidator.requiredValidator]);
      amount.updateValueAndValidity({emitEvent: false});
      unit.setValidators(!repeatedProtocol ? [] : [CustomValidator.requiredValidator]);
      unit.updateValueAndValidity({emitEvent: false});

      this.valid.emit(this.form.valid);
    });

    if (entity) {
      this.form.patchValue(entity);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
