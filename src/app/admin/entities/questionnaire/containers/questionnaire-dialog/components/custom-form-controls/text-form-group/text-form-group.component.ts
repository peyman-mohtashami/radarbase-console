import {Component, effect, inject, input, OnDestroy} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator
} from '@angular/forms';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Subscription} from "rxjs";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {ValidatorError, Validator as CustomValidator} from "../../../../../../../../shared/utils/validators";
import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {QuestionnaireStateService} from "../../../services/questionnaire-state.service";

@Component({
  selector: 'app-text-form-group',
  templateUrl: './text-form-group.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextFormGroupComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TextFormGroupComponent
    }
  ]
})
export class TextFormGroupComponent implements ControlValueAccessor, OnDestroy, Validator {

  questionnaireStateService = inject(QuestionnaireStateService);

  protected readonly ValidatorError = ValidatorError;

  languages = input.required<RadarOption[]>();

  label = input.required<string | undefined>();
  placeholder = input<string>('');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  textarea = input<boolean>(false);
  textareaRows = input<number>(3);
  textareaAutosize = input<boolean>(false);

  form = new FormGroup<{[p: string]: FormControl<string | null>}>({});

  private valueChangesSub?: Subscription;

  constructor() {
    effect(() => {
      this.initializeLanguageControls();
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
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

  onChange = (value: any) => {};
  onTouch = () => {};

  writeValue(value?: Record<string, string>) {
    if (value) {
      this.initializeLanguageControls();
      this.form.patchValue(value, { emitEvent: false });
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

  private initializeLanguageControls() {
    this.languages().forEach(lang => {
      const languageString = lang.id.toString();
      if (!this.form.contains(languageString)) {
        this.form.addControl(
          languageString,
          new FormControl('', {
            validators: this.required() ? CustomValidator.requiredValidator : undefined,
            nonNullable: true
          })
        );
      }
    });
  }
  //
  // private initializeLanguageControls() {
  //   this.languages().forEach(lang => {
  //     if (!this.form.contains(lang.id.toString())) {
  //       this.form.addControl(lang.id.toString(), new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}));
  //     }
  //   });
  // }
}
