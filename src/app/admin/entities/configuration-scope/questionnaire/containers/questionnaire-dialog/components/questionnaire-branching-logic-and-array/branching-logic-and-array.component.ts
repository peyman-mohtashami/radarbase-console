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
import {MatFormField} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {
  MatSelectAutocompleteComponent
} from '../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {AppQuestion, AppQuestionnaire} from '../../../../models/questionnaire';
import {RadarCondition} from '../../questionnaire-dialog.component';

@Component({
  selector: 'app-branching-logic-and-array',
  templateUrl: './branching-logic-and-array.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BranchingLogicAndArrayComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: BranchingLogicAndArrayComponent,
    },
  ],
  imports: [
    ReactiveFormsModule,
    MatSelectAutocompleteComponent,
    MatFormField,
    MatSelect,
    MatOption,
    MatIcon,
    MatButton,
  ]
})
export class BranchingLogicAndArrayComponent
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

  conditionalTypes = [
    'radio',
    'checkbox',
    'text',
    'range',
    'slider',
    'datepicker',
  ];

  questionsOptions?: any;
  previousQuestions: RadarOption[] = [];

  entity = input.required<AppQuestionnaire>();
  index = input<number>(0);

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    and_group: this.fb.array([this.newBranchingLogic()]),
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
      this.previousQuestions = questions.filter(
          (q, i) =>
            this.conditionalTypes.includes(q.field_type) && i < this.index()
        )
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

  writeValue(value: RadarCondition[]) {
    if (value) {
      value?.forEach((q) => this.addBranchingLogic(q));
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
    return this.form.get('and_group') as FormArray;
  }

  newBranchingLogic(c?: RadarCondition): FormGroup {
    return this.fb.group({
      condition_field: [null],
      condition_operator: [null],
      condition_value: [null],
    });
  }

  addBranchingLogic(c?: RadarCondition) {
    this.branchingLogics.push(this.newBranchingLogic(c));
  }

  removeBranchingLogic(i: number) {
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
