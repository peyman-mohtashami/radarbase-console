import {Component, effect, input, OnDestroy, OnInit, signal} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ReactiveFormsModule, Validator,
} from "@angular/forms";
import { Subscription } from 'rxjs';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import { ValidatorError, Validator as CustomValidator } from "../../../../../shared/utils/validators";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {TranslatePipe} from "@ngx-translate/core";
import {MatFormField, MatHint, MatInput, MatSuffix} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatError} from "@angular/material/form-field";
import {AppQuestion, AppQuestionnaire, RadarQuestion} from "../../models/questionnaire";
import {BranchingLogicComponent} from "../branching-logic/branching-logic.component";
import {moveItemInFormArray} from "../../containers/questionnaire-dialog/questionnaire-dialog.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {RadarOption} from "../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {JsonPipe} from "@angular/common";
import {ChoicesComponent} from "../choices/choices.component";
import {TimePipe} from "../../../../../shared/pipes/time.pipe";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-question',
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
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    CdkDropList,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatFormField,
    MatLabel,
    MatError,
    TranslatePipe,
    MatInput,
    MatSelect,
    MatOption,
    MatExpansionPanelHeader,
    CdkDrag,
    BranchingLogicComponent,
    MatHint,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIconButton,
    JsonPipe,
    ChoicesComponent,
    MatSuffix,
    TimePipe,
    CdkTextareaAutosize,
  ]
})
export default class QuestionComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  protected readonly ValidatorError = ValidatorError;
  protected readonly DEFAULT_LANG = {id: 'en', _name: 'English'};

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

  entity = input.required<AppQuestionnaire>();
  // language = input.required<string>();
  disabled = input<boolean>(false);
  languages = input.required<RadarOption[]>();

  selectedLanguage = 'en'

  selectedQuestion = signal<FormGroup<{
    field_name: FormControl<string | null>
    field_type: FormControl<string | null | undefined>
    field_label: FormGroup<{[p: string]: FormControl<string | null>}>,
    section_header: FormGroup<{[p: string]: FormControl<string | null>}>,
    select_choices_or_calculations: FormArray<FormGroup<{code: FormControl<string | undefined>, label: FormGroup<{[p: string]: FormControl}>}>>, //new FormControl(choicesString),
    // select_choices_or_calculations: FormArray<FormControl<number | undefined>>,//([]),FormControl<any>
    field_annotation: FormGroup<{
      image: FormControl<string>
      timer: FormGroup<{
        start: FormControl<number>
        end: FormControl<number>
      }>
      unit: FormControl<string>
    }>
    range: FormGroup<{
      min: FormControl<any>
      max: FormControl<any>
      step: FormControl<any>
    }>
    branching_logic: FormControl<string | null | undefined>
  }> | null>(null);

  form = new FormArray<FormGroup<{
    field_name: FormControl<string | null>
    field_type: FormControl<string | null | undefined>
    field_label: FormGroup<{[p: string]: FormControl<string | null>}>,
    section_header: FormGroup<{[p: string]: FormControl<string | null>}>,
    select_choices_or_calculations: FormArray<FormGroup<{code: FormControl<string | undefined>, label: FormGroup<{[p: string]: FormControl}>}>>, //new FormControl(choicesString),
    // select_choices_or_calculations: FormArray<FormControl<number | undefined>>,//FormControl<any>
    field_annotation: FormGroup<{
      image: FormControl<string>
      timer: FormGroup<{
        start: FormControl<number>
        end: FormControl<number>
      }>
      unit: FormControl<string>
    }>
    range: FormGroup<{
      min: FormControl<any>
      max: FormControl<any>
      step: FormControl<any>
    }>
    branching_logic: FormControl<string | null | undefined>
  }>>([]);

  onChangeSubs: Subscription[] = [];

  onTouched = () => {};

  constructor() {
    effect(() => {
      const languages = this.languages();

    });
  }
  ngOnInit() {


    // this.questionsOptions = this.entity()?.translations?.[this.language()]?.reduce(
    //   (obj: any, item: RadarQuestion) => {
    //     obj[item.field_name] = item.select_choices_or_calculations;
    //     return obj;
    //   },
    //   {}
    // );
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
    // } else {
      // this.form.enable();
    }
  }

  writeValue(value?: AppQuestion[]) {
    console.log('Class: QuestionComponent, Function: writeValue, Line 145 value' , value);
    if (value) {
      value.forEach((q) => this.addQuestion(q));
    }
    // this.form.patchValue(value, { emitEvent: false });
  }

  validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }
    const errors: any = {};
    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    // const errors = { ...allErrors };
    //
    // const controlErrors = this.form.controls[controlName].errors;
    //
    // if (controlErrors) {
    //   errors[controlName] = controlErrors;
    // }
    // return errors;
  }

  newQuestion(q?: AppQuestion) {
    // const choicesString = (q?.select_choices_or_calculations as any)
    //   ?.map((c: any) => `${c.code}: ${c.label}`)
    //   .join('\n');

    const fieldType =
      q?.field_type === 'text' &&
      q.text_validation_type_or_show_slider_number === 'date_dmy'
        ? 'datepicker'
        : q?.field_type;

    // console.log('Class: QuestionComponent, Function: newQuestion, Line 178' , this.language() !== 'en');

    // const disabled = this.language() !== 'en'
    // const newTranslation = this.language() === 'new';
    const fieldLabelGroup = this.languages().reduce((acc: {[p: string]: FormControl}, cur) => {
      acc[cur.id] = new FormControl(q?.field_label?.[cur.id] || "");
      return acc;
    }, {});

    const sectionHeaderGroup = this.languages().reduce((acc: {[p: string]: FormControl}, cur) => {
      acc[cur.id] = new FormControl(q?.section_header?.[cur.id] || "");
      return acc;
    }, {});

    const select_choices_or_calculations_array = (q?.select_choices_or_calculations || []).map((c: any) => {
      return new FormGroup({
        code: new FormControl(c.code),
        label: new FormGroup(this.languages().reduce((acc: { [p: string]: FormControl }, cur) => {
          acc[cur.id] = new FormControl(c.label?.[cur.id] || "");
          return acc;
        }, {}))
      })
    });


    return new FormGroup({
      field_name: new FormControl(q?.field_name || "", {validators: [CustomValidator.requiredValidator]}),
      field_type: new FormControl(fieldType, [CustomValidator.requiredValidator]),
      field_label: new FormGroup(fieldLabelGroup), //{[this.DEFAULT_LANG.id]: new FormControl("")}), //new FormControl(newTranslation ? null : q?.field_label, [CustomValidator.requiredValidator]),
      section_header: new FormGroup(sectionHeaderGroup), //{[this.DEFAULT_LANG.id]: new FormControl("")}), //new FormControl(newTranslation ? null : q?.section_header),
      select_choices_or_calculations: new FormArray<FormGroup<{code: FormControl<string | undefined>, label: FormGroup<{[p: string]: FormControl}>}>>(select_choices_or_calculations_array), //new FormControl(choicesString),
      field_annotation: new FormGroup({ //this.fb.group({
        image: new FormControl((q?.field_annotation as any)?.image),
        timer: new FormGroup({ //this.fb.group({
          start: new FormControl((q?.field_annotation as any)?.timer?.start),
          end: new FormControl((q?.field_annotation as any)?.timer?.end),
        }),
        unit: new FormControl((q?.field_annotation as any)?.unit),
      }),
      range: new FormGroup({
        min: new FormControl((q?.range as any)?.min),
        max: new FormControl((q?.range as any)?.max),
        step: new FormControl((q?.range as any)?.step),
      }),
      branching_logic: new FormControl(q?.branching_logic ? q.branching_logic : undefined), //this.fb.array([]),
    });
    // return new FormGroup({
    //   field_name: new FormControl({value: q?.field_name || "", disabled: disabled}, {validators: [CustomValidator.requiredValidator]}),
    //   field_type: new FormControl({value: fieldType, disabled: disabled}, [CustomValidator.requiredValidator]),
    //   field_label: new FormControl(newTranslation ? null : q?.field_label, [CustomValidator.requiredValidator]),
    //   section_header: new FormControl(newTranslation ? null : q?.section_header),
    //   select_choices_or_calculations: new FormControl(choicesString),
    //   field_annotation: new FormGroup({ //this.fb.group({
    //     image: new FormControl((q?.field_annotation as any)?.image),
    //     timer: new FormGroup({ //this.fb.group({
    //       start: new FormControl((q?.field_annotation as any)?.timer?.start),
    //       end: new FormControl((q?.field_annotation as any)?.timer?.end),
    //     }),
    //     unit: new FormControl((q?.field_annotation as any)?.unit),
    //   }),
    //   range: new FormGroup({
    //     min: new FormControl((q?.range as any)?.min),
    //     max: new FormControl((q?.range as any)?.max),
    //     step: new FormControl((q?.range as any)?.step),
    //   }),
    //   branching_logic: new FormControl(q?.branching_logic ? q.branching_logic : undefined), //this.fb.array([]),
    // });
  }

  addQuestion(q?: AppQuestion) {
    console.log('Class: QuestionComponent, Function: addQuestion, Line 240 q' , q);
    this.form.push(this.newQuestion(q));
    // this.questions.push(this.newQuestion(q));
  }

  removeQuestion(i: number) {
    console.log('Class: QuestionComponent, Function: removeQuestion, Line 245 i' , i);
    this.form.removeAt(i);
    // this.questions.removeAt(i);
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInFormArray(
    //   this.questions,
    //   event.previousIndex,
    //   event.currentIndex
    // );
    moveItemInFormArray(
      this.form,
      event.previousIndex,
      event.currentIndex
    );
  }

  dropChoice(event: CdkDragDrop<string[]>, formArray: FormArray) {
    // moveItemInFormArray(
    //   this.questions,
    //   event.previousIndex,
    //   event.currentIndex
    // );
    moveItemInFormArray(
      formArray,
      event.previousIndex,
      event.currentIndex
    );
  }

  protected selectQuestion(
    question: FormGroup<{
      field_name: FormControl<string | null>
      field_type: FormControl<string | null | undefined>
      field_label: FormGroup<{[p: string]: FormControl<string | null>}>,
      section_header: FormGroup<{[p: string]: FormControl<string | null>}>,
      select_choices_or_calculations: FormArray<FormGroup<{code: FormControl<string | undefined>, label: FormGroup<{[p: string]: FormControl}>}>>, //new FormControl(choicesString),
      // select_choices_or_calculations: FormControl<any>
      field_annotation: FormGroup<{
        image: FormControl<string>
        timer: FormGroup<{
          start: FormControl<number>
          end: FormControl<number>
        }>
        unit: FormControl<string>
      }>
      range: FormGroup<{
        min: FormControl<any>
        max: FormControl<any>
        step: FormControl<any>
      }>
      branching_logic: FormControl<string | null | undefined>
    }>, i: number) {
    this.selectedQuestion.set(question);
  }

  addChoice(formArray: FormArray, choice?: {code: string, label: Record<string, string>}, index?: number) {
    // const formArray = this.form.controls.protocol.controls.repeatQuestionnaire.controls.unitsFromZero;
    const newFormGroup = this.newChoice(choice);

    if (index !== undefined && index >= 0 && index <= formArray.length) {
      formArray.insert(index, newFormGroup);
    } else {
      formArray.push(newFormGroup);
    }
  }
  // addTime(time?: number, index?: number) {
  //   this.form.controls.protocol.controls.repeatQuestionnaire.controls.unitsFromZero.push(this.newTime(time));
  //   // this.questions.push(this.newQuestion(q));
  // }

  newChoice(choice?: {code: string, label: Record<string, string>}) {
    return new FormGroup<{code: FormControl<string | undefined>, label: FormGroup<{[p: string]: FormControl}>}>(
      {
        code: new FormControl<string>(choice?.code || '', {nonNullable: true}),
        label: new FormGroup({})
      }
      // choice ? choice : {code: new FormControl(""), label: new FormGroup({})}
    );
    // return new FormControl<number | undefined>(time, {nonNullable: true});
  }

  removeChoice(formArray: FormArray, i: number) {
    console.log('Class: QuestionComponent, Function: removeQuestion, Line 245 i' , i);
    formArray.removeAt(i);
    // this.questions.removeAt(i);
  }
}
