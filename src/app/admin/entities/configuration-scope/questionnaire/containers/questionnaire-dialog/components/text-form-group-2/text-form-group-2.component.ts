import {Component, effect, inject, input} from '@angular/core';
import {
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, NG_VALIDATORS
} from '@angular/forms';
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {TranslateModule} from "@ngx-translate/core";
import {Validator as CustomValidator} from "../../../../../../../../shared/utils/validators";
import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
// import {QuestionnaireStateService} from "../../services/questionnaire-state.service";
import {
  BaseFormGroupComponent
} from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-text-form-group-2',
  templateUrl: './text-form-group-2.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
    MatError,
    TranslateModule,
    UpperCasePipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextFormGroup2Component
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TextFormGroup2Component
    }
  ]
})
export class TextFormGroup2Component extends BaseFormGroupComponent<Record<string, string>> {

  // questionnaireStateService = inject(QuestionnaireStateService);

  language = input.required<RadarOption>();
  // languages = input.required<RadarOption[]>();
  label = input.required<string | undefined>();
  placeholder = input<string>('');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  textarea = input<boolean>(false);
  textareaRows = input<number>(3);
  textareaAutosize = input<boolean>(false);

  override form = new FormGroup<Record<string, FormControl<string | null>>>({});

  constructor() {
    super();
    effect(() => {
      this.initializeLanguageControls();
      this.updateValidators();
    });
  }

  override writeValue(value: Record<string, string>) {
    if (value) {
      this.initializeLanguageControls();
      this.updateValidators();
    }
    super.writeValue(value || null);
  }

  private updateValidators() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.setValidators(this.required() ? CustomValidator.requiredValidator : null);
        control.updateValueAndValidity({ emitEvent: false });
      }
    });
    this.validatorChange();
  }

  private initializeLanguageControls() {
    // this.languages().forEach(lang => {
      const languageString = this.language().id.toString();
      if (!this.form.contains(languageString)) {
        this.form.addControl(languageString, new FormControl('', {nonNullable: true}));
      }
    // });
  }
}
