import {Component, effect, inject, input, OnDestroy, OnInit, output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatHint, MatInput} from "@angular/material/input";
import {
  MatSelectAutocompleteComponent
} from "../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatStepperNext} from "@angular/material/stepper";
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors, Validator
} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {
  Validator as CustomValidator,
  ValidatorError,
  ValidatorHint
} from "../../../../../../../shared/utils/validators";
import {DEFAULT_LANGUAGE, ISO_LANGUAGES} from "../../../../../questionnaire/models/questionnaire";
import {MatError} from "@angular/material/form-field";
import {MatFormField} from "@angular/material/select";
import {RadarOption} from "../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {Subscription} from "rxjs";
import {AppProtocol, FormProtocol} from "../../../../models/protocol";
import {toSignal} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs/operators";
import {ProtocolStateService} from "../../services/protocol-state.service";

@Component({
  selector: 'app-protocol-step-general',
  templateUrl: './protocol-step-general.html',
  imports: [
    // MatButton,
    // MatDivider,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatSelectAutocompleteComponent,
    MatSlideToggle,
    // MatStepperNext,
    ReactiveFormsModule,
    TranslatePipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProtocolStepGeneral
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProtocolStepGeneral
    }
  ],
})
export class ProtocolStepGeneral implements OnInit, ControlValueAccessor, OnDestroy, Validator {

  protected readonly ValidatorHint = ValidatorHint;
  protected readonly ValidatorError = ValidatorError;
  protected readonly ISO_LANGUAGES = ISO_LANGUAGES;
  protected readonly DEFAULT_LANG = DEFAULT_LANGUAGE;

  private protocolStateService = inject(ProtocolStateService);

  entities = input.required<AppProtocol[]>();
  entity = input<FormProtocol | undefined>();

  languagesUpdated = output<RadarOption[]>();
  onDemandTypeUpdated = output<boolean>();

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [CustomValidator.requiredValidator, CustomValidator.stringIdValidator],
    }),
    languages: new FormControl<RadarOption[]>([this.DEFAULT_LANG], {nonNullable: true}),
    onDemand: new FormControl<boolean>(false),
    showInCalendar: new FormControl<boolean>(true),
    isDemo: new FormControl<boolean>(false),
    order: new FormControl<number>(0),
  });

  private readonly onDemandValueChanges = toSignal(
    this.form.controls.onDemand.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.onDemand.getRawValue()}
  );

  private readonly languagesValueChanges = toSignal(
    this.form.controls.languages.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.languages.getRawValue()}
  );

  private valueChangesSub?: Subscription;

  constructor() {
    effect(() => {
      const onDemandValue = this.onDemandValueChanges();
      this.onDemandTypeUpdated.emit(!!onDemandValue);
      const languagesValue = this.languagesValueChanges();
      this.languagesUpdated.emit(languagesValue);
      const selectedLanguage = this.protocolStateService.selectedLanguage();
      const validLanguage = languagesValue.find(l => l.id === selectedLanguage) ?? languagesValue[0];
      this.protocolStateService.selectedLanguage.set(validLanguage.id.toString())
    });
  }

  ngOnInit() {
    this.form.controls.name.addValidators(this.duplicateValidator);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('Class: QuestionnaireStepGeneral, Function: validate, Line 101 ',);
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

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }

  onChange = (value: any) => {
  };
  onTouch = () => {
  };

  writeValue(value?: Record<string, string>) {
    if (value) {
      this.form.patchValue(value, {emitEvent: true});
    } else {
      this.form.reset();
    }
  }

  registerOnChange(fn: any) {
    this.valueChangesSub?.unsubscribe();
    this.valueChangesSub = this.form.valueChanges.subscribe(value => {
      fn(value);
    });
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  private duplicateValidator = (control: AbstractControl) => {
    return this.entities()?.find(entity =>
      control.value === entity.name && this.entity()?.general.name !== entity.name
    )
      ? {duplicate: true}
      : null;
  };
}
