import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray, FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator
} from "@angular/forms";
import { Subscription } from 'rxjs';
// import { RadarQuestion } from "@rb/models";
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import { ValidatorError, Validator as CustomValidator } from "../../../../../shared/utils/validators";
import { AppQuestion, AppQuestionnaire, AppQuestionnaireBundle } from "../../models/questionnaire";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {BranchingLogicComponent} from "../branching-logic/branching-logic.component";

@Component({
  selector: 'rb-question',
  templateUrl: './question.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: QuestionComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: QuestionComponent,
    },
  ],
  imports: [
    // JsonPipe,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    CdkDropList,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    // NgForOf,
    // NgIf,
    MatFormField,
    MatLabel,
    MatError,
    TranslatePipe,
    MatInput,
    MatSelect,
    MatOption,
    BranchingLogicComponent,
    MatExpansionPanelHeader,
    CdkDrag,
    JsonPipe
  ]
})
export class QuestionComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{

  ValidatorError = ValidatorError;

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

  @Input()
  entity?: AppQuestionnaireBundle;

  @Input()
  language: any;

  @Input() disabled = false;

  form: FormGroup = new FormGroup({
    questions: new FormArray<any>([])
  });

  onChangeSubs: Subscription[] = [];

  onTouched = () => {
    //
  };

  // constructor(
  //   // private fb: FormBuilder
  // ) {}

  ngOnInit() {
    console.log(this.language);
    this.questionsOptions = this.entity?.translations?.[this.language]?.questions?.reduce(
      (obj: any, item: AppQuestion) => {
        obj[item.field_name] = item.select_choices_or_calculations;
        return obj;
      },
      {}
    );
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

  writeValue(value: AppQuestion[]) {
    console.log(value)
    if (value) {
      value?.forEach((q) => this.addQuestion(q));
    }
    // this.form.get('questions')?.patchValue(value, { emitEvent: false });
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

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
    // return this.form.controls['questions'] as FormArray //.get('questions') as FormArray;
  }

  newQuestion(q?: AppQuestion): FormGroup<any> {
    const choicesString = (q?.select_choices_or_calculations as any)
      ?.map((c: any) => `${c.code}: ${c.label}`)
      .join('\n');
    const fieldType =
      q?.field_type === 'text' &&
      q.text_validation_type_or_show_slider_number === 'date_dmy'
        ? 'datepicker'
        : q?.field_type;
    return new FormGroup({
      field_name: new FormControl({value: q?.field_name || "", disabled: false}, {validators: [CustomValidator.requiredValidator]}),
      section_header: new FormControl(q?.section_header),
      field_type: new FormControl({value: fieldType, disabled: false}, [CustomValidator.requiredValidator]),
      field_label: new FormControl(q?.field_label, [CustomValidator.requiredValidator]),
      select_choices_or_calculations: new FormControl(choicesString),
      // select_choices_or_calculations: new FormControl(q?.select_choices_or_calculations),
      field_annotation: new FormGroup({ //this.fb.group({
        image: new FormControl((q?.field_annotation as any)?.image),
        timer: new FormGroup({ //this.fb.group({
          start: new FormControl((q?.field_annotation as any)?.timer?.start),
          end: new FormControl((q?.field_annotation as any)?.timer?.end),
        }),
        unit: new FormControl((q?.field_annotation as any)?.unit),
      }),
      range: new FormGroup({ //this.fb.group({
        min: new FormControl((q?.range as any)?.min),
        max: new FormControl((q?.range as any)?.max),
        step: new FormControl((q?.range as any)?.step),
      }),
      // has_branching_logic: [null],
      branching_logic: new FormControl(q?.branching_logic ? q.branching_logic : undefined), //this.fb.array([]),
    })
  }

  addQuestion(q?: AppQuestion) {
    this.questions.push(this.newQuestion(q));
  }

  removeQuestion(i: number) {
    this.questions.removeAt(i);
  }
  //
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
  //
  // branchingLogics(question: AbstractControl): FormArray {
  //   // console.log('questions');
  //   return question.get('branching_logic') as FormArray;
  // }
  //
  // newBranchingLogic(c?: RadarCondition): FormGroup {
  //   return this.fb.group({
  //     condition_field: [null],
  //     condition_operator: [null],
  //     condition_value: [null],
  //   });
  // }
  //
  // addBranchingLogic(question: AbstractControl, c?: RadarCondition) {
  //   this.branchingLogics(question).push(this.newBranchingLogic(c));
  // }
  //
  // removeBranchingLogic(question: AbstractControl, i: number) {
  //   this.branchingLogics(question).removeAt(i);
  // }
  // //
  // // getQuestionsOptions(i: number): { code: string; label: string }[] {
  // //   console.log('questions  opt');
  // //   return [
  // //     { code: '0', label: 'Not at all' },
  // //     { code: '1', label: 'More than half the days' },
  // //     { code: '2', label: 'More than half the days' },
  // //     { code: '3', label: 'Nearly every day' },
  // //   ];
  // //
  // // // const choicesString = q?.select_choices_or_calculations
  // // //   ?.map((c) => `${c.code}: ${c.label}`)
  // // //   .join('\n');
  // // const choices = this.questions
  // //   .at(i)
  // //   .get('select_choices_or_calculations')?.value;
  // // return choices
  // //   .toString()
  // //   .split('\n')
  // //   .map((v: string) => {
  // //     const choice = v.split(': ');
  // //     return { code: choice[0], label: choice[1] };
  // //   });
  // // }
  //
  // // questionType(index: number): string {
  // //   console.log('question typ');
  // //
  // //   return this.questions.at(index).get('field_type')?.value; // as FormArray
  // // }
  // //
  // // questionName(index: number): string {
  // //   console.log('question name');
  // //
  // //   return this.questions.at(index).get('field_name')?.value;
  // // }
  //
  // // questionType(index:number) : FormArray {
  // //   return this.questions().at(index).get("field_type") as FormArray
  // // }
  //
  // onSubmit() {
  //   console.log(this.form?.value);
  // }
  //
  // drop(event: CdkDragDrop<string[]>) {
  //   // moveItemInFormArray(
  //   //   this.questions,
  //   //   event.previousIndex,
  //   //   event.currentIndex
  //   // );
  // }
  //
  // // getOrganizationObject(): { id: number | string; name: string } {
  // //   if (this.entity) {
  // //     console.log({
  // //       id: this.entity.organization.id,
  // //       name: this.entity.organization.name,
  // //     });
  // //     return {
  // //       id: this.entity.organization.id,
  // //       name: this.entity.organization.name,
  // //     };
  // //   } else {
  // //     const organization = this.organizations.find(
  // //       (o) => o.name === this.organizationName
  // //     );
  // //     if (organization) {
  // //       console.log({ id: organization.id, name: this.organizationName });
  // //       return { id: organization.id, name: this.organizationName };
  // //     } else {
  // //       const defaultOrganization = this.organizations[0];
  // //       console.log({
  // //         id: defaultOrganization.id,
  // //         name: defaultOrganization.name,
  // //       });
  // //       return { id: defaultOrganization.id, name: defaultOrganization.name };
  // //     }
  // //   }
  // // }
  //
  // // override save(): void {
  // //   this.isLoading = true;
  // //   const sourceTypes = this.sourceTypes.filter((s) =>
  // //     this.form?.value.sourceTypes?.includes(
  // //       `${s.producer}_${s.model}_${s.catalogVersion}`
  // //     )
  // //   );
  // //   const entity = { ...this.entity, ...this.form?.value };
  // //   entity.organization = this.organizations.find(
  // //     (o) => o.name === this.form?.value.organization
  // //   );
  // //   entity.sourceTypes = sourceTypes;
  // //   this.actionTriggered.emit({ action: this.mode, entity });
  // // }
  //
  // // private duplicateValidator = (control: AbstractControl) => {
  // //   if (
  // //     this.entities.find(
  // //       (entity) =>
  // //         entity.projectName === control.value &&
  // //         this.entity?.projectName !== entity.projectName
  // //     )
  // //   ) {
  // //     return { duplicate: true };
  // //   }
  // //   return null;
  // // };

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInFormArray(
    //   this.questions,
    //   event.previousIndex,
    //   event.currentIndex
    // );
  }
}
