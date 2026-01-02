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
export class MatDynamicInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy //, Validator AfterViewInit
{
  ValidatorError = ValidatorError;

  entityName = input.required<string>();

  field = input.required<ExtraFieldCustomConfiguration>();
  // @Input() legend?: string;
  // @Input() label?: string;

  options = input<RadarOption[]>([]);
  _options = computed(() => {
    return this.options().map(o => {
      console.log('Class: MatDynamicInputComponent, Function: , Line 99 o' , o);
      return {id: o.id, _name: o._name}
    })
  })

  // @Input() multiple = false;
  // @Input() required = false;

  // floatLabel = input<boolean>(false);

  form!: FormControl<string | null>; // = new FormControl<RadarOption[]>([]);
  // name = 'project'
  dateFormat = 'mm/dd/yyy';

  // multiFilterCtrl: FormControl = new FormControl();

  // filteredMulti$: ReplaySubject<RadarOption[]> = new ReplaySubject<
  //   RadarOption[]
  // >(1);

  // @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

  protected _destroy$ = new Subject<void>();

  onTouched = () => {
    // TODO
  };

  ngOnInit(): void {
    // if(this.multiple){
    //   this.form = new FormControl<RadarOption[]>([]);
    // }else {
    const validators: ValidatorFn[] = [];
    if (this.field()['validators']?.['requiredValidator']) {
      validators.push(Validator.requiredValidator);
    }
    if (this.field()['validators']?.['normalTextValidator']) {
      validators.push(Validator.normalTextValidator);
    }
    this.form = new FormControl("", [...validators]);
    // }
    // this.filteredMulti$.next(this.options.slice());

    // this.multiFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe(() => {
    //     this.filterMulti();
    //   });
  }

  // ngAfterViewInit() {
  //   this.setInitialValue();
  // }

  // protected setInitialValue() {
  //   // this.filteredMulti$
  //   //   .pipe(take(1), takeUntil(this._destroy$))
  //   //   .subscribe(() => {
  //   //     // setting the compareWith property to a comparison function
  //   //     // triggers initializing the selection according to the initial value of
  //   //     // the form control (i.e. _initializeSelection())
  //   //     // this needs to be done after the filteredBanks are loaded initially
  //   //     // and after the mat-option elements are available
  //   //     this.multiSelect.compareWith = (a, b) => a && b && a === b;
  //   //   });
  // }

  // protected filterMulti() {
  //   if (!this.options) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.multiFilterCtrl.value;
  //   if (!search) {
  //     this.filteredMulti$.next(this.options.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   this.filteredMulti$.next(
  //     this.options.filter(
  //       (option) => option.name.toLowerCase().indexOf(search) > -1
  //     )
  //   );
  // }

  // removeChip(option: RadarOption) {
  //   if(this.form.value) {
  //     const formValue = [...this.form.value];
  //     const index = formValue.indexOf(option);
  //     formValue.splice(index, 1);
  //     this.form.patchValue(formValue);
  //   }
  // }

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
    //   if (Array.isArray(value)) {
    //     const options = value.map((v: RadarOption) => {
    //       return this.options.find((o) => o.id === v.id);
    //     })
    //     const _options = options.filter((option) => {
    //       console.log(option);
    //       return !!option
    //     }) as RadarOption[];
    //     this.form.setValue(_options, { emitEvent: false });
    //   } else {
    //     console.log('not array', this.options)
    //     const _value = this.options.find((o) => o.id === value.id);
    //     console.log(_value)
    //     if (_value) {
          this.form.setValue(value, { emitEvent: false });
    //     }
    //     // this.form.setValue(_value ? [_value] : [], { emitEvent: false });
    //   }
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
  protected readonly ValidatorHint = ValidatorHint;
}
