import {
  AfterViewInit,
  Component, input,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR, ReactiveFormsModule,
} from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {MatFormField, MatOption, MatSelect, MatSelectTrigger} from '@angular/material/select';
import { ValidatorError } from '../../utils/validators';
import {TranslatePipe} from "@ngx-translate/core";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AsyncPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatError} from "@angular/material/form-field";
import {TagComponent} from "../tag/tag.component";
import {MatIconButton} from "@angular/material/button";

// export interface RadarOption {
//   id: number | string;
//   _name: string;
// }

export interface MatSelectAutocompleteAdapter<TOption> {
  value(option: TOption): string; //id
  label(option: TOption): string; //_name
  filter?(option: TOption): string;
  // compare?(a: TValue, b: TValue): boolean;
}

@Component({
  selector: 'app-mat-select-autocomplete',
  templateUrl: './mat-select-autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MatSelectAutocompleteComponent,
    },
    // {
    //   provide: NG_VALIDATORS,
    //   multi: true,
    //   useExisting: MatSelectAutocompleteComponent,
    // },
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatFormField,
    MatSelectTrigger,
    MatError,
    MatSelect,
    TranslatePipe,
    ReactiveFormsModule,
    MatOption,
    NgxMatSelectSearchModule,
    AsyncPipe,
    TagComponent,
    MatIconButton,
    MatIcon,
  ],
})
export class MatSelectAutocompleteComponent<TOption>
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy //, Validator
{
  protected readonly ValidatorError = ValidatorError;

  label = input<string>("");
  options = input<TOption[]>([]);
  multiple = input<boolean>(false);
  required = input<boolean>(false);
  // floatLabel = input<boolean>(false);
  notRemovable = input<TOption>();
  adapter = input.required<MatSelectAutocompleteAdapter<TOption>>();

  form = new FormControl<TOption | TOption[] | null>(null); // = new FormControl<RadarOption[]>([]);

  multiFilterCtrl: FormControl = new FormControl();

  filteredMulti$: ReplaySubject<TOption[]> = new ReplaySubject<
    TOption[]
  >(1);

  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

  protected _destroy$ = new Subject<void>();

  onTouched: () => void = () => undefined;

  ngOnInit(): void {
    if(this.multiple()){
      this.form = new FormControl<TOption[]>([]);
    }else {
      this.form = new FormControl<TOption | null>(null);
    }
    this.filteredMulti$.next(this.options().slice());

    this.multiFilterCtrl.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.filterMulti();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  protected setInitialValue() {
    this.filteredMulti$
      .pipe(take(1), takeUntil(this._destroy$))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a, b) => a && b && a === b;
      });
  }

  protected filterMulti() {
    if (!this.options()) {
      return;
    }
    // get the search keyword
    let search = this.multiFilterCtrl.value;
    if (!search) {
      this.filteredMulti$.next(this.options().slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredMulti$.next(
      this.options().filter(
        (option) => this.adapter().label(option).toLowerCase().indexOf(search) > -1
      )
    );
  }

  removeChip(option: TOption) {
    if(this.form.value && (!this.notRemovable() || this.adapter().value(this.notRemovable()!) !== this.adapter().value(option))) {
      if (Array.isArray(this.form.value)) {
        const formValue = [...this.form.value];
        const index = formValue?.indexOf(option);
        formValue.splice(index, 1);
        this.form.patchValue(formValue);
      } else {
        this.form.patchValue(null);
      }
    }
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

  writeValue(value: TOption | TOption[]) {
    // console.log(value);
    if (value) {
      if (Array.isArray(value)) {
        const options = value.map((v: TOption) => {
          return this.options().find((o) => this.adapter().value(o) === this.adapter().value(v));
        })
        const _options = options.filter((option) => {
          // console.log(option);
          return !!option
        }) as TOption[];
        this.form.setValue(_options, { emitEvent: false });
      } else {
        // console.log('not array', this.options)
        const _value = this.options().find((o) => this.adapter().value(o) === this.adapter().value(value));
        // console.log(_value)
        if (_value) {
          this.form.setValue(_value, { emitEvent: false });
        }
        // this.form.setValue(_value ? [_value] : [], { emitEvent: false });
      }
    }
  }

  // validate(control: AbstractControl) {
  //   // TODO
  //   if (this.form.valid) {
  //     return null;
  //   }
  //
  //   const errors: any = {};
  //
  //   // errors = this.addControlErrors(errors, "addressLine1");
  //   // errors = this.addControlErrors(errors, "addressLine2");
  //   // errors = this.addControlErrors(errors, "zipCode");
  //   // errors = this.addControlErrors(errors, "city");
  //
  //   return errors;
  // }
  //
  // // TODO
  //
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

  protected readonly Array = Array;
}
