import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormArray, FormControl,
  FormGroup, ReactiveFormsModule,
} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';

import { Validator } from '../../../../../shared/utils/validators';
import {DateAdapter, MatOption} from '@angular/material/core';
import { LANGUAGES } from '../../../protocol/containers/protocol-dialog/languages';
import { BaseDialogComponent } from '../../../../components/base-dialog/base-dialog.component';
import { AppQuestion, AppQuestionnaire, AppQuestionnaireBundle } from "../../models/questionnaire";
import { Store } from '@ngrx/store';
import {DialogTitleComponent} from "../../../../components/base-dialog/dialog-title/dialog-title.component";
import {TranslatePipe} from "@ngx-translate/core";
import {
  DialogBodyDescriptionComponent
} from "../../../../components/base-dialog/dialog-body-description/dialog-body-description.component";
import {MatFormField, MatHint, MatInput} from "@angular/material/input";
import {ErrorMessageComponent} from "../../../../../core/error/components/message/error-message.component";
import {DialogActionsComponent} from "../../../../components/base-dialog/dialog-actions/dialog-actions.component";
import {QuestionComponent} from "../../components/question/question.component";
import {MatLabel, MatSelect} from "@angular/material/select";
import {ENTITY_NAME} from "../../../../enums/entities";
import {JsonPipe} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";

export interface RadarCondition {
  conditionField: string;
  conditionOperator: string;
  conditionValue: string;
}
@Component({
  selector: 'rb-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  imports: [
    DialogTitleComponent,
    TranslatePipe,
    MatDialogContent,
    DialogBodyDescriptionComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    MatSelect,
    MatOption,
    ErrorMessageComponent,
    DialogActionsComponent,
    QuestionComponent,
    JsonPipe,
    MatSlideToggle
  ]
})
export class QuestionnaireDialogComponent
  // extends BaseDialogComponent<
  //   AppQuestionnaireBundle,
  //   QuestionnaireDialogComponent
  // >
  extends BaseDialogComponent<
    any,
    QuestionnaireDialogComponent
  >
  implements OnInit, OnDestroy
{
  override name = ENTITY_NAME.questionnaire;

  LANGUAGES = LANGUAGES;

  override form = new FormGroup({
    id: new FormControl<string | number>({ value: "", disabled: true }),
    name: new FormControl("", [Validator.requiredValidator, Validator.stringIdValidator]),
    language: new FormControl("", [Validator.requiredValidator]),
    isDefault: new FormControl(false),
    //defaultLanguage: new FormControl(""),
    // _language: new FormControl(""),
    // language: new FormControl("en"),
    // questions: this.fb.array([]),
    questions: new FormControl<AppQuestion[]>([])
  });

  languages = LANGUAGES.map((l) => ({
    id: l.code,
    name: l.name, //`${l.name} [${l.code}]`,
  }));

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

  // questionnaireBundle = this.data.entity;
  // questionnaire?: AppQuestionnaire = this.data.entity?.translations?.[this.data.extra ?? 'en'];
  // ProjectStatus = ProjectStatus;

  // entities = this.data.entities;
  // organizations = this.data.organizations;
  // organizationOptions = this.data.organizations
  //   .map((o) => o.name)
  //   .sort((a, b) => a.localeCompare(b));
  // organizationName = this.data.organizationName;
  //
  // sourceTypes = this.data.sourceTypes;
  constructor(
    router: Router,
    dialogRef: MatDialogRef<QuestionnaireDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public override data: {
      mode: string;
      entity: any;
      // language: RadarARMTLanguage;
      entities: AppQuestionnaire[];
      extra: any;
    },
    // currentLocaleService: LocaleService,
    store: Store,
    dateAdapter: DateAdapter<any>
  ) {
    super(router, dialogRef, data, store, dateAdapter);
  }

  // sourceTypesOptions = this.data.sourceTypes
  //   .map((s) => `${s.producer}_${s.model}_${s.catalogVersion}`)
  //   .sort((a, b) => a.localeCompare(b));

  override ngOnInit() {
    console.log(this.entity)
    super.ngOnInit();
    // this.questionsOptions = this.entity.questions?.reduce(
    //   (obj: any, item: RadarQuestion) => {
    //     obj[item.field_name] = item.select_choices_or_calculations;
    //     return obj;
    //   },
    //   {}
    // );
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  override initForm() {
    // console.log(this.data.extra, this.questionnaire, this.entity);
    // if (this.data.language) {
    //   if (this.questionnaire) {
    //     this.form?.patchValue(this.questionnaire);
    //   }
    // } else {
    //   if (!this.entity) {
    //     this.form.patchValue({language: "en"})
    //     this.form.controls.language.disable();
    //   } else {
    console.log('Class: QuestionnaireDialogComponent, Function: initForm, Line 163 this.entity' , this.entity);
        if (this.entity) {
          // this.form?.patchValue({...this.entity.translations?.[this.data.extra ?? 'en'], isDefault: this.data.extra === this.entity.defaultLanguage});
          this.form?.patchValue(
            {
              id: this.entity.id,
              name: this.entity.name,
              language: this.data.extra ?? this.entity.defaultLanguage,
              isDefault: this.data.extra ? this.data.extra === this.entity.defaultLanguage :  true,
              questions: this.entity.translations[this.data.extra ?? this.entity.defaultLanguage]
            },
          );
        }
    //   }
    //   // if (this.questionnaire) {
    //   //   this.form?.patchValue(this.questionnaire);
    //   // } else {
    //   //   this.form.patchValue({language: "en"})
    //   //   this.form.controls.language.disable();
    //   // }
    // }
    // this.form.controls.language.valueChanges.subscribe(value => {
    //   console.log(value);
    //   if(value){
    //     // this.questionnaire = {...this.entity.translations["en"], language: value}
    //     if(this.entity.translations["da"].questions) {
    //       this.form.controls.questions.patchValue(this.entity.translations["da"].questions);
    //     }
    //   }
    //
    // })
    // if (this.questionnaire) {
    //   this.form?.patchValue(this.questionnaire);
    // } else {
    //   this.form.patchValue({language: "en"})
    //   this.form.controls.language.disable();
    // }
    // throw new Error('BaseDialogComponent "initForm" method not implemented');
  }

  // override initForm(): void {
  //   this.form = this.fb.group({
  //     id: [{ value: this.entity ? this.entity.id : undefined, disabled: true }],
  //     name: [
  //       this.entity ? this.entity.name : undefined,
  //       [
  //         Validator.requiredValidator,
  //         Validator.stringIdValidator,
  //         // this.duplicateValidator,
  //       ],
  //     ],
  //     language: [this.entity ? this.entity.language : undefined], // first language in array || english
  //     // questions: this.fb.array([]),
  //     questions: [this.entity ? this.entity.questions : undefined],
  //   });
  //   // this.entity?.questions?.forEach((q) => this.addQuestion(q));
  //   // this.form.get('questions')?.setValue(this.entity.questions)
  // }

  override save() {
    console.log(this.form?.value);
  }

  // get questions(): FormArray {
  //   // console.log('questions');
  //   return this.form?.get('questions') as FormArray;
  // }
  //
  // newQuestion(q?: RadarQuestion): FormGroup {
  //   const choicesString = q?.select_choices_or_calculations
  //     ?.map((c) => `${c.code}: ${c.label}`)
  //     .join('\n');
  //   const fieldType =
  //     q?.field_type === 'text' &&
  //     q.text_validation_type_or_show_slider_number === 'date_dmy'
  //       ? 'datepicker'
  //       : q?.field_type;
  //   return this.fb.group({
  //     field_name: [q?.field_name],
  //     section_header: [q?.section_header],
  //     field_type: [fieldType],
  //     field_label: [q?.field_label],
  //     select_choices_or_calculations: [choicesString],
  //     field_annotation: this.fb.group({
  //       image: [(q?.field_annotation as any)?.image],
  //       timer: this.fb.group({
  //         start: [(q?.field_annotation as any)?.timer?.start],
  //         end: [(q?.field_annotation as any)?.timer?.end],
  //       }),
  //       unit: [(q?.field_annotation as any)?.unit],
  //     }),
  //     range: this.fb.group({
  //       min: [(q?.range as any)?.min],
  //       max: [(q?.range as any)?.max],
  //       step: [(q?.range as any)?.step],
  //     }),
  //     has_branching_logic: [null],
  //     branching_logic: this.fb.array([]),
  //     totalQuantity: [60],
  //     // branching_logic: this.fb.group({
  //     //   condition_field: [null],
  //     //   condition_operator: [null],
  //     //   condition_value: [null],
  //     // }),
  //   });
  // }
  //
  // addQuestion(q?: RadarQuestion) {
  //   this.questions.push(this.newQuestion(q));
  // }
  //
  // removeQuestion(i: number) {
  //   this.questions.removeAt(i);
  // }
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
  // protected readonly LANGUAGES = LANGUAGES;
}

export function moveItemInFormArray(
  formArray: FormArray,
  fromIndex: number,
  toIndex: number
): void {
  const dir = toIndex > fromIndex ? 1 : -1;

  const item = formArray.at(fromIndex);
  for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
    const current = formArray.at(i + dir);
    formArray.setControl(i, current);
  }
  formArray.setControl(toIndex, item);
}
