import {Component, inject, input, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {QuestionChoice} from '../question-choice/question-choice';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {TextFormGroupComponent} from '../../../components/text-form-group/text-form-group.component';
import {ValidatorError} from '../../../../../../../../../shared/utils/validators';
// import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {AppQuestionChoice} from '../../../../../models/questionnaire';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';

@Component({
  selector: 'app-question-choices-form-array',
  templateUrl: './question-choices-form-array.html',
  imports: [
    ReactiveFormsModule,
    CdkDropList,
    MatIcon,
    MatIconButton,
    QuestionChoice,
    TranslatePipe,
    CdkDrag,
    MatError,
    MatFormField,
    MatInput,
    TextFormGroupComponent
  ],
})
export class QuestionChoicesFormArray implements OnInit {
  private fb = inject(FormBuilder);

  languages = input.required<RadarOption[]>();
  language = input.required<RadarOption>();
  index = input.required<number>();
  _choices = input<AppQuestionChoice[]>();

  @Input({ required: true })
  choices!: FormArray;

  ngOnInit() {
    if (this._choices() && this._choices()?.length) {
      this._choices()?.forEach((choice) => {
        this.choices.push(this.fb.group({
          code: choice.code,
          label: choice.label,
        }));
      });
    } else {
      this.addChoice();
    }
  }

  addChoice() {
    // this.choices.push(this.fb.control(''));
    this.choices.push(this.fb.group({
      code: '',
      label: {},
    }));//control(''));
  }

  removeChoice(index: number) {
    this.choices.removeAt(index);
  }

  // get choiceControls(): FormControl[] {
  //   return this.choices.controls as FormControl[];
  // }

  get choiceGroups(): FormGroup[] {
    return this.choices.controls as FormGroup[];
  }

  // addItem(index: number) {
  //   // this.choices.splice(index + 1, 0, {
  //   //   code: '',
  //   //   label: {},
  //   // });
  //   this.choices.splice(index + 1, 0, {
  //     code: '',
  //     label: {},
  //   });
  // }
  //
  // removeItem(index: number) {
  //   // this.choices.splice(index, 1);
  //   this.choices.controls.splice(index, 1);
  //   // this.validEvent.emit(this.checkValidity());
  //   // this.changeEvent.emit(this.choices);
  // }

  protected onDrop($event: CdkDragDrop<any, any, any>) {

  }

  protected readonly ValidatorError = ValidatorError;
}
