import {Component, inject, input, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CdkDropList} from '@angular/cdk/drag-drop';
import {TranslatePipe} from '@ngx-translate/core';
import {QuestionChoice} from '../../../question-choice/question-choice';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {QuestionChoicesFormArray} from '../../../question-choices-form-array/question-choices-form-array';
import {
  RadarOption
} from '../../../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion, AppQuestionChoice} from '../../../../../../../models/questionnaire';
// import {
//   RadarOption
// } from '../../../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
// import {QuestionChoices} from '../../../question-choices/question-choices';

@Component({
  selector: 'app-radio-question',
  imports: [
    ReactiveFormsModule,
    CdkDropList,
    TranslatePipe,
    QuestionChoice,
    MatIcon,
    MatIconButton,
    // QuestionChoices
    QuestionChoicesFormArray
  ],
  templateUrl: './radio-question.component.html'
  // template: `
  //   <div [formGroup]="form">
  //     <div formArrayName="choices">
  //       @for (choice of choices.controls; track $index; let i = $index) {
  //       <div>
  //         <input [formControlName]="i">
  //       </div>
  //       }
  //     </div>
  //
  //     <button type="button" (click)="addChoice()">
  //       Add Choice
  //     </button>
  //   </div>
  // `
})
export class RadioQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input({ required: true }) form!: FormGroup;

  @Input({ required: true }) languages!: RadarOption[];
  // languages = input.required<RadarOption[]>();
  @Input({ required: true }) language!: RadarOption;
  // language = input.required<RadarOption>();

  // index = input.required<number>();
  @Input({ required: true }) index!: number;

  @Input({required: true}) entity!: AppQuestion;

  ngOnInit(): void {
    if (!this.form.contains('select_choices_or_calculations')) {
      this.form.addControl(
        'select_choices_or_calculations',
        this.fb.array([])
      );
      //   this.fb.array([
      //     this.fb.group({
      //       code: this.fb.control(''),
      //       label: this.fb.control({}),
      //     })
      //   ])
      // );
    }
  }

  get choices(): FormArray {
    return this.form.get('select_choices_or_calculations') as FormArray;
  }

  // get choices(): FormArray {
  //   return this.form.get('choices') as FormArray;
  // }

  // addChoice(): void {
  //   this.choices.push(this.fb.control(''));
  // }
  //
  // addItem(index: number) {
  //   // this.choices.splice(index + 1, 0, {
  //   //   code: '',
  //   //   label: {},
  //   // });
  //   this.choices.controls.splice(index + 1, 0, {
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
  //
  // protected onDrop($event: CdkDragDrop<any, any, any>) {
  //
  // }
}
