import {Component, effect, inject, input, OnInit, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';
import {AppQuestionChoice} from '../../../../../models/questionnaire';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Validator as CustomValidator, ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {TranslatePipe} from '@ngx-translate/core';
import {TextFormGroupComponent} from '../../../components/text-form-group/text-form-group.component';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-question-choice',
  templateUrl: './question-choice.html',
  imports: [
    MatIcon,
    MatFormField,
    MatIconButton,
    CdkDrag,
    MatInput,
    MatError,
    ReactiveFormsModule,
    TranslatePipe,
    TextFormGroupComponent,
  ],
})
export class QuestionChoice implements OnInit {
  protected readonly ValidatorError = ValidatorError;

  index = input.required<number>();
  choice = input.required<AppQuestionChoice>();
  languages = input.required<RadarOption[]>();
  language = input.required<RadarOption>();

  removeEvent = output<number>();
  changeEvent = output<AppQuestionChoice>();
  validEvent = output<boolean>();

  form = new FormGroup({
    code: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    label: new FormControl<Record<string, string>>({}, {validators: [CustomValidator.requiredValidator],nonNullable: true}),
  });

  // protected questionnaireStateService = inject(QuestionnaireStateService);

  constructor() {
    effect(() => {
      this.form.patchValue(this.choice());
      // this.form.updateValueAndValidity();
      // this.form.markAllAsTouched();
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((val) => {
      this.changeEvent.emit((val as AppQuestionChoice));
      this.validEvent.emit(this.form.valid);
    })
  }

  removeItem() {
    this.removeEvent.emit(this.index());
  }

}
