import {Component, computed, input, OnDestroy, OnInit,} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidatorFn,} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatFormField, MatHint, MatOption, MatSelect} from '@angular/material/select';
import {Validator, ValidatorError, ValidatorHint} from '../../utils/validators';
import {TranslatePipe} from "@ngx-translate/core";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatError} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput, MatSuffix} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ToDatePipe} from "../../pipes/to-date.pipe";
import {MatSelectAutocompleteComponent} from "../mat-select-autocomplete/mat-select-autocomplete.component";
import {ExtraFieldCustomConfiguration} from '../../../core/configuration/models/custom-configuration.model';

export interface RadarOption {
  id: number | string;
  _name: string;
}

@Component({
  selector: 'app-mat-dynamic-input',
  templateUrl: './mat-dynamic-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MatDynamicInputComponent,
    },
    // {
    //   provide: NG_VALIDATORS,
    //   multi: true,
    //   useExisting: MatSelectAutocompleteComponent,
    // },
  ],
  imports: [
    MatFormField,
    MatError,
    MatSelect,
    TranslatePipe,
    ReactiveFormsModule,
    MatOption,
    NgxMatSelectSearchModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatHint,
    MatInput,
    MatSlideToggle,
    ToDatePipe,
    MatSelectAutocompleteComponent,
    MatSuffix
  ],
})
export class MatDynamicInputComponent implements ControlValueAccessor, OnInit, OnDestroy { //, Validator AfterViewInit {
  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;

  entityName = input.required<string>();
  field = input.required<ExtraFieldCustomConfiguration>();
  options = input<RadarOption[]>([]);

  _options = computed(() => {
    return this.options().map(o => {
      return {id: o.id, _name: o._name}
    })
  })

  form!: FormControl<string | null>;

  dateFormat = 'mm/dd/yyy';

  protected _destroy$ = new Subject<void>();

  onTouched = () => {
    // TODO
  };

  ngOnInit(): void {
    const validators: ValidatorFn[] = [];
    if (this.field()['validators']?.['requiredValidator']) {
      validators.push(Validator.requiredValidator);
    }
    if (this.field()['validators']?.['normalTextValidator']) {
      validators.push(Validator.normalTextValidator);
    }
    this.form = new FormControl("", [...validators]);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  registerOnChange(onChange: (_: unknown) => void) {
    this.form.valueChanges.pipe(
      takeUntil(this._destroy$)
    ).subscribe(onChange);
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(value: string) {
    console.log(value);
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  // validate() {
  //   // TODO
  //   if (this.form.valid) {
  //     return null;
  //   }
  //
  //   // errors = this.addControlErrors(errors, "addressLine1");
  //   // errors = this.addControlErrors(errors, "addressLine2");
  //   // errors = this.addControlErrors(errors, "zipCode");
  //   // errors = this.addControlErrors(errors, "city");
  //
  //   return {};
  // }

  // TODO

  // addControlErrors(allErrors: any, controlName: string) {
  //   const errors = { ...allErrors };
  //
  //   const controlErrors = this.form.get(controlName)?.errors;
  //
  //   if (controlErrors) {
  //     errors[controlName] = controlErrors;
  //   }
  //
  //   return errors;
  // }

}
