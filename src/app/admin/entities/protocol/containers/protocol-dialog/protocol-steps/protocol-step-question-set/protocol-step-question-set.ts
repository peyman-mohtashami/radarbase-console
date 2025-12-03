import {Component, effect, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ReactiveFormsModule, ValidationErrors,
  Validator
} from "@angular/forms";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatError, MatHint, MatInput} from "@angular/material/input";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {Subscription} from "rxjs";
import {
  ValidatorHint,
  Validator as CustomValidator,
  ValidatorError
} from "../../../../../../../shared/utils/validators";
import {MatDivider} from "@angular/material/divider";
import {toSignal} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {MatStepperNext} from "@angular/material/stepper";

@Component({
  selector: 'app-protocol-step-question-set',
  templateUrl: './protocol-step-question-set.html',
  imports: [
    ReactiveFormsModule,
    MatSlideToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatSelect,
    MatOption,
    MatDivider,
    MatError,
    TranslatePipe,
    // MatButton,
    // MatStepperNext
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProtocolStepQuestionSet
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ProtocolStepQuestionSet
    }
  ],
})
export class ProtocolStepQuestionSet implements ControlValueAccessor, OnDestroy, Validator {
  protected readonly ValidatorError = ValidatorError;
  protected readonly ValidatorHint = ValidatorHint;

  form = new FormGroup({
    github: new FormControl<boolean>(false),
    questionnaire: new FormGroup({
      name: new FormControl<string>('', {nonNullable: true}),
      repository: new FormControl<string>('', {nonNullable: true}),
      avsc: new FormControl<string>('questionnaire', {nonNullable: true}),
    }),
    appQuestionnaire: new FormControl('', {validators: [CustomValidator.requiredValidator]}),
    estimatedCompletionTime: new FormControl<number | null>(null),
  });

  private valueChangesSub?: Subscription;

  protected readonly githubValueChanges = toSignal(
    this.form.controls.github.valueChanges.pipe(debounceTime(300)),
    {initialValue: this.form.controls.github.getRawValue()}
  );

  private validatorChange: () => void = () => {};
  private statusSub?: Subscription;

  constructor() {
    effect(() => {
      const githubValue = this.githubValueChanges();
      console.log('Class: QuestionnaireStepQuestionSet, Function: , Line 76 githubValue' , githubValue);
      this.form.controls.questionnaire.controls.name.setValidators(!githubValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.questionnaire.controls.name.updateValueAndValidity({emitEvent: false});
      this.form.controls.questionnaire.controls.repository.setValidators(!githubValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.questionnaire.controls.repository.updateValueAndValidity({emitEvent: false});
      this.form.controls.appQuestionnaire.setValidators(githubValue ? [] : [CustomValidator.requiredValidator]);
      this.form.controls.appQuestionnaire.updateValueAndValidity({emitEvent: false});

      // IMPORTANT: tell Angular to re-run this component's validator
      this.validatorChange();
    });

    // Also notify when the inner form’s status changes (covers field edits)
    this.statusSub = this.form.statusChanges.subscribe(() => this.validatorChange());
  }

  // private applyGithubDependentValidators(githubValue: boolean | null) {
  //   this.form.controls.questionnaire.controls.name.setValidators(!githubValue ? [] : [CustomValidator.requiredValidator]);
  //   this.form.controls.questionnaire.controls.name.updateValueAndValidity({ emitEvent: false });
  //   this.form.controls.questionnaire.controls.repository.setValidators(!githubValue ? [] : [CustomValidator.requiredValidator]);
  //   this.form.controls.questionnaire.controls.repository.updateValueAndValidity({ emitEvent: false });
  //   this.form.controls.appQuestionnaire.setValidators(githubValue ? [] : [CustomValidator.requiredValidator]);
  //   this.form.controls.appQuestionnaire.updateValueAndValidity({ emitEvent: false });
  // }



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

  registerOnValidatorChange(fn: () => void): void {
    this.validatorChange = fn;
  }

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }

  onChange = (value: any) => {};
  onTouch = () => {};

  writeValue(value?: Record<string, string>) {
    if (value) {
      // this.form.patchValue(value, { emitEvent: false });
      this.form.patchValue(value);
      // const githubValue = this.form.controls.github.getRawValue();
      // this.applyGithubDependentValidators(githubValue);

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


}
