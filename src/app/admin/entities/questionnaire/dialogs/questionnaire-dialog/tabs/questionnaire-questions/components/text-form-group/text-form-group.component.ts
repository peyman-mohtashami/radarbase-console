import {Component, effect, inject, Input, input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule, FormBuilder
} from '@angular/forms';
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
// import {TranslateModule} from "@ngx-translate/core";
import {AppQuestionnaireLanguage, DEFAULT_LANGUAGE} from '../../../../../../models/questionnaire';
import {Validator, ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-text-form-group',
  templateUrl: './text-form-group.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
    MatError,
    TranslatePipe,
    // TranslateModule,
  ],
})
export class TextFormGroupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ValidatorError = ValidatorError;

  language = input<AppQuestionnaireLanguage | undefined>(this.dialogState.questionnaire()?.defaultLanguage ?? DEFAULT_LANGUAGE);
  label = input<string>();
  placeholder = input<string>('');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  textarea = input<boolean>(false);
  textareaRows = input<number>(3);
  textareaAutosize = input<boolean>(false);

  value = input<Record<string, string>>();

  @Input({ required: true })
  textGroup!: FormGroup;

  languages = this.dialogState.questionnaire()?.languages ?? [DEFAULT_LANGUAGE];

  ngOnInit() {
    this.initializeLanguageControls();
    this.updateValidators();

    const value = this.value();
    if (value) {
      this.textGroup.patchValue(value);
    }
  }

  constructor() {
    effect(() => {
      this.initializeLanguageControls();
    });

    effect(() => {
      this.updateValidators();
    });
  }

  private updateValidators() {
    Object.keys(this.textGroup.controls).forEach(key => {
      const control = this.textGroup.get(key);
      if (control) {
        control.setValidators(this.required() ? Validator.requiredValidator : null);
        control.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  private initializeLanguageControls() {
    const languageString = this.language()?.code.toString();
    if (languageString) {
      this.textGroup.addControl(languageString, this.fb.control(''));
    }
  }
}
