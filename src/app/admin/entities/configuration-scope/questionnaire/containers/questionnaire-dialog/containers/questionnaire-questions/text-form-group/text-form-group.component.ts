import {Component, effect, inject, Input, input, OnInit} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule, FormBuilder
} from '@angular/forms';
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {TranslateModule} from "@ngx-translate/core";
import {AppQuestion, DEFAULT_LANGUAGE} from '../../../../../models/questionnaire';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {Validator, ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';

@Component({
  selector: 'app-text-form-group',
  templateUrl: './text-form-group.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
    MatError,
    TranslateModule,
  ],
})
export class TextFormGroupComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  protected readonly ValidatorError = ValidatorError;

  // languages = input.required<RadarOption[]>();
  language = input<RadarOption | undefined>(this.dialogState.selectedQuestionnaire()?.defaultLanguage ?? DEFAULT_LANGUAGE);
  label = input<string>();
  placeholder = input<string>('');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  textarea = input<boolean>(false);
  textareaRows = input<number>(3);
  textareaAutosize = input<boolean>(false);

  // _entity =  input<AppQuestion | undefined>(undefined);
  value = input<Record<string, string>>();

  @Input({ required: true })
  textGroup!: FormGroup;

  languages = this.dialogState.selectedQuestionnaire()?.languages ?? [DEFAULT_LANGUAGE];
  // language = this.dialogState.selectedQuestionnaire()?.defaultLanguage;

  ngOnInit() {
    // console.log('&&&Class: TextFormGroupComponent, Function: ngOnInit, Line 48 ' , );
    this.initializeLanguageControls();
    this.updateValidators();

    const value = this.value();
    // console.log('&&&Class: TextFormGroupComponent, Function: ngOnInit, Line 53 ' , value);
    // console.log('Class: TextFormGroupComponent, Function: ngOnInit, Line 49 value' , value);
    if (value) {
      this.textGroup.patchValue(value);
    }
    // if (this._entity()) {
      // this._choices()?.forEach((choice) => {
      //   this.choices.push(this.fb.group({
      //     code: choice.code,
      //     label: choice.label,
      //   }));
      // });
    // } else {
      // this.addChoice();
    // }
  }

  constructor() {
    effect(() => {
      this.initializeLanguageControls();
      // console.log('&&&Class: TextFormGroupComponent, Function: , Line 71 ' , );
    });

    effect(() => {
      this.updateValidators();
      // console.log('&&&Class: TextFormGroupComponent, Function: , Line 75 ' , );
    });

    // effect(() => {
    //   const value = this.value();
    //   // console.log('Class: TextFormGroupComponent, Function: ngOnInit, Line 49 value' , value);
    //   if (value) {
    //     this.textGroup.patchValue(value);
    //   }
    //   console.log('&&&Class: TextFormGroupComponent, Function: , Line 85 ' , );
    // });
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
    // console.log('Class: TextFormGroupComponent, Function: initializeLanguageControls, Line 83 ' , );
    const languageString = this.language()?.id.toString();
    if (languageString) {
      this.textGroup.addControl(languageString, this.fb.control(''));
    }
  }

}
