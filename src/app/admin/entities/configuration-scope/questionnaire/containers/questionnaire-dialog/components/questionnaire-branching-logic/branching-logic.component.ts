import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {
  BranchingLogicAndArrayComponent
} from '../questionnaire-branching-logic-and-array/branching-logic-and-array.component';
import {AppQuestion, AppQuestionnaire} from '../../../../models/questionnaire';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {RadarCondition} from '../../questionnaire-dialog.component';
// import {BranchingLogicAndArrayComponent} from "../branching-logic-and-array/branching-logic-and-array.component";

@Component({
  selector: 'app-branching-logic',
  templateUrl: './branching-logic.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BranchingLogicComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: BranchingLogicComponent,
    },
  ],
  imports: [
    ReactiveFormsModule,
    MatSlideToggle,
    MatIcon,
    MatButton,
    BranchingLogicAndArrayComponent,
    // BranchingLogicAndArrayComponent
  ]
})
export class BranchingLogicComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  questionTypes = [
    { name: 'radio', label: 'Radio' },
    { name: 'checkbox', label: 'Checkbox' },
    { name: 'text', label: 'Text Input' },
    { name: 'range', label: 'Range' },
    { name: 'slider', label: 'Slider' },
    { name: 'info', label: 'Info' },
    { name: 'audio', label: 'Audio' },
    { name: 'timed', label: 'Timed' },
    { name: 'range-info', label: 'Range Info' },
    { name: 'radio-matrix', label: 'Radio-Matrix' },
    { name: 'datepicker', label: 'Date Input' },
  ];

  questionsOptions?: any;
  previousQuestions: RadarOption[] = [];

  entity = input.required<AppQuestionnaire>();
  index = input<number>(0);

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    has_branching_logic: [null],
    or_group: this.fb.array([this.newBranchingLogicArray()]), //[this.newBranchingLogic()]),
  });

  onChangeSubs: Subscription[] = [];

  onTouched = () => {
    //
  };

  // constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const questions = this.entity().questions;
    this.questionsOptions = questions.reduce(
      (obj: any, item: AppQuestion) => {
        obj[item.field_name] = item.select_choices_or_calculations;
        return obj;
      },
      {}
    );
    if (questions) {
      this.previousQuestions = questions.filter((q, i) => i < this.index())
        .map((q) => ({
          id: q.field_name,
          _name: q.field_name,
        }));
    }
  }

  ngOnDestroy() {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any) {
    const sub = this.form.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(value: string) { //RadarCondition[][]) {
    console.log(value)
    const temp = value?.split("or").map(el => el.trim());
    console.log(temp);
    if (value) {
      // value?.forEach((q) => this.addBranchingLogicArray(q));
      // this.form.setValue(value, { emitEvent: false });
    }
  }

  validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }

    const errors: any = {};

    // errors = this.addControlErrors(errors, 'addressLine1');
    // errors = this.addControlErrors(errors, 'addressLine2');
    // errors = this.addControlErrors(errors, 'zipCode');
    // errors = this.addControlErrors(errors, 'city');

    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = { ...allErrors };

    const controlErrors = this.form.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }

  // getPreviousQuestionsName(index: number) {
  //   console.log('prev questions');
  //   const result = [];
  //   for (let i = 0; i < index; i++) {
  //     result.push({
  //       value: this.questions.at(i).get('field_name')?.value?.toString(),
  //       label: this.questions.at(i).get('field_name')?.value?.toString(),
  //     });
  //   }
  //   return result;
  // }

  get branchingLogics(): FormArray {
    // console.log('questions');
    return this.form.get('or_group') as FormArray;
  }

  newBranchingLogicArray(c?: RadarCondition[]): FormGroup {
    return this.fb.group({
      conditions: [null],
      // condition_field: [null],
      // condition_operator: [null],
      // condition_value: [null],
    });
  }

  addBranchingLogicArray(c?: RadarCondition[]) {
    this.branchingLogics.push(this.newBranchingLogicArray(c));
  }

  removeBranchingLogicArray(i: number) {
    this.branchingLogics.removeAt(i);
  }
  //
  // getQuestionsOptions(i: number): { code: string; label: string }[] {
  //   console.log('questions  opt');
  //   return [
  //     { code: '0', label: 'Not at all' },
  //     { code: '1', label: 'More than half the days' },
  //     { code: '2', label: 'More than half the days' },
  //     { code: '3', label: 'Nearly every day' },
  //   ];
  //
  // // const choicesString = q?.select_choices_or_calculations
  // //   ?.map((c) => `${c.code}: ${c.label}`)
  // //   .join('\n');
  // const choices = this.questions
  //   .at(i)
  //   .get('select_choices_or_calculations')?.value;
  // return choices
  //   .toString()
  //   .split('\n')
  //   .map((v: string) => {
  //     const choice = v.split(': ');
  //     return { code: choice[0], label: choice[1] };
  //   });
  // }

  // questionType(index: number): string {
  //   console.log('question typ');
  //
  //   return this.questions.at(index).get('field_type')?.value; // as FormArray
  // }
  //
  // questionName(index: number): string {
  //   console.log('question name');
  //
  //   return this.questions.at(index).get('field_name')?.value;
  // }

  // questionType(index:number) : FormArray {
  //   return this.questions().at(index).get("field_type") as FormArray
  // }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInFormArray(
    //   this.questions,
    //   event.previousIndex,
    //   event.currentIndex
    // );
  }
}


/*
"branching_logic": "[protect_vit_d] = '1' or [other_vit_d] = '1'",

"branching_logic": "[smoke_days] = '1' or [smoke_days] = '2' or [smoke_days] = '3' or [smoke_days] = '4' or [smoke_days] = '5' or [smoke_days] = '6' or [smoke_days] = '7'",

"branching_logic": "[smoke_days_3] = '1'",

"branching_logic": "[smoke_days_2] = '1' or [smoke_days_2] = '2' or [smoke_days_2] = '3' or [smoke_days_2] = '4' or [smoke_days_2] = '5' or [smoke_days_2] = '6' or [smoke_days_2] = '7'",

"branching_logic": "[smoke_days_2] = '1' or [smoke_days_2] = '2' or [smoke_days_2] = '3' or [smoke_days_2] = '4' or [smoke_days_2] = '5' or [smoke_days_2] = '6' or [smoke_days_2] = '7'",

"branching_logic": "[smoke_days_2] = '1' or [smoke_days_2] = '2' or [smoke_days_2] = '3' or [smoke_days_2] = '4' or [smoke_days_2] = '5' or [smoke_days_2] = '6' or [smoke_days_2] = '7'",

"branching_logic": "[smoke_days_2] = '1' or [smoke_days_2] = '2' or [smoke_days_2] = '3' or [smoke_days_2] = '4' or [smoke_days_2] = '5' or [smoke_days_2] = '6' or [smoke_days_2] = '7'",

"branching_logic": "[ts_1] = '1'",

"branching_logic": "[fitness_tracker_used]=\"1\" and [fitness_tracker_using]=\"0\"",

"branching_logic": "[others] = '1' or [others] = '2'  or [others] = '3'",
*/
