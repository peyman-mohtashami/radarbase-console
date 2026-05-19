import {Component, effect, inject, input, OnDestroy, OnInit, output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms';
import {MatIconButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {TranslatePipe} from "@ngx-translate/core";
import {ChoicesFormArrayComponent} from "../choices-form-array/choices-form-array.component";
import {Validator as CustomValidator, ValidatorError} from "../../../../../../../../../shared/utils/validators";
import {AnnotationFormGroupComponent} from "../annotation-form-group/annotation-form-group.component";
import {RangeFormGroupComponent} from "../range-form-group/range-form-group.component";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TextFormGroupComponent} from '../../../components/text-form-group/text-form-group.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {
  ConditionalLogicDialogComponent
} from '../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';
import {DialogMode} from '../../../../../../../../base-entities/enums/dialog';
import {QUESTION_TYPES} from '../models/question-types';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  imports: [
    MatIconButton,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    TranslatePipe,
    ChoicesFormArrayComponent,
    TextFormGroupComponent,
    AnnotationFormGroupComponent,
    RangeFormGroupComponent,
    MatRadioButton,
    MatRadioGroup,
    MatIcon,
  ],
})
export class QuestionComponent implements OnInit, OnDestroy {
  questions = input.required<AppQuestion[]>();
  entity = input.required<AppQuestion>();
  index = input.required<number>();
  languages = input.required<RadarOption[]>();

  questionnaireStateService = inject(QuestionnaireStateService);

  protected readonly DialogMode = DialogMode;
  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  changeEvent = output<Partial<AppQuestion>>();
  valid = output<boolean>();

  form = new FormGroup({
    field_name: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_type: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_label: new FormControl<AppQuestion['field_label']>({}, {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    section_header: new FormControl<AppQuestion['section_header']>({}, {nonNullable: true}),
    text_validation_type_or_show_slider_number: new FormControl('', {nonNullable: true}),
    text_validation_min: new FormControl('', {nonNullable: true}),
    text_validation_max: new FormControl('', {nonNullable: true}),
    field_annotation: new FormControl<AppQuestion['field_annotation']>('', {nonNullable: true}),
    select_choices_or_calculations: new FormControl<AppQuestion['select_choices_or_calculations']>([], {nonNullable: true}),
    range: new FormControl<AppQuestion['range']>(undefined, {nonNullable: true}),
    branching_logic: new FormControl<string>('', {nonNullable: true}),
  });

  private subscription?: Subscription;

  constructor() {
    effect(() => {
      const entity = this.entity();
      if (entity) {
        this.form.patchValue(entity);//, {emitEvent: false});
      }
      this.valid.emit(this.form.valid);
    });
  }

  ngOnInit() {
    console.log('Class: QuestionComponent, Function: ngOnInit, Line 139 ' , );
    this.form.controls.field_name.addValidators(this.duplicateValidator);
    this.form.controls.field_name.updateValueAndValidity();

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      this.changeEvent.emit(change);
      // this.valid.emit(this.form.valid);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private duplicateValidator = (control: AbstractControl) => {
    return (this.questions() ?? []).find(entity =>
      control.value === entity.field_name && this.entity()?.field_name !== entity.field_name
    )
      ? {duplicate: true}
      : null;
  }
  //   const question = this.question();
  //   console.log('Class: QuestionComponent, Function: ngOnInit, Line 119 question' , question);
  //   if (question) {
  //     this.form.patchValue(question);
  //   }
  //
  //   this.valid.emit(this.form.valid);
  //
  //   this.form.valueChanges.subscribe(change => {
  //     this.changeEvent.emit(change);
  //     this.valid.emit(this.form.valid);
  //   });

  // constructor() {
  //   super();
  //
  //   this.form.statusChanges.subscribe(() => {
  //     this.validatorChange();
  //   });
  //
  //   this.form.controls.field_type?.valueChanges.subscribe(type => {
  //     this.updateFormControls(type);
  //     this.validatorChange();
  //   });
  // }

  updateFormControls(type?: string) {
    if (!type) return;

    // ['text_validation_type_or_show_slider_number', 'text_validation_min', 'text_validation_max', 'field_annotation', 'select_choices_or_calculations', 'range'].forEach(controlName => {
    //   if (this.form.contains(controlName)) {
    //     this.form.removeControl(controlName as keyof QuestionForm);
    //   }
    // });

    // if (type === 'timed') {
    //   this.form.addControl('field_annotation' as keyof QuestionForm, new FormControl<QuestionFormAnnotation | null>(null));
    // } else {
    //   this.form.removeControl('field_annotation' as keyof QuestionForm);
    // }
    // if (type === 'slider') {
    //   this.form.addControl('range' as keyof QuestionForm, new FormControl<QuestionFormRange | null>(null));
    // } else {
    //   this.form.removeControl('range' as keyof QuestionForm);
    // }
    // if (['radio', 'checkbox', 'info', 'range', 'slider', 'range-info'].includes(type)) {
    //   this.form.addControl('select_choices_or_calculations' as keyof QuestionForm, new FormControl([],{nonNullable: true, validators: [CustomValidator.requiredValidator]}));
    // } else {
    //   this.form.removeControl('select_choices_or_calculations' as keyof QuestionForm);
    // }
    // if (['text'].includes(type)) {
    //   this.form.addControl('text_validation_type_or_show_slider_number' as keyof QuestionForm, new FormControl<string>(''));
    //   this.form.addControl('text_validation_min' as keyof QuestionForm, new FormControl<string>(''));
    //   this.form.addControl('text_validation_max' as keyof QuestionForm, new FormControl<string>(''));
    // } else {
    //   this.form.removeControl('text_validation_type_or_show_slider_number' as keyof QuestionForm);
    //   this.form.removeControl('text_validation_min' as keyof QuestionForm);
    //   this.form.removeControl('text_validation_max' as keyof QuestionForm);
    // }
    // if (['datetime'].includes(type)) {
    //   this.form.addControl('text_validation_type_or_show_slider_number' as keyof QuestionForm, new FormControl<string>(''));
    // } else {
    //   this.form.removeControl('text_validation_type_or_show_slider_number' as keyof QuestionForm);
    // }
  }

  // override writeValue(question: AppQuestion) {
  //   if (!question) {
  //     this.editMode.set(true);
  //   }
  //   this.updateFormControls(question?.field_type);
  //   super.writeValue(question);
  // }

  protected dialog = inject(MatDialog);
  // protected conditionalLogicAvailable: any;

  protected editConditionalLogic() {
   this.openConditionalLogicDialog();
  }

  openConditionalLogicDialog() {
    const dialogRef = this.dialog.open(ConditionalLogicDialogComponent, {
      id: 'conditional-logic-dialog',
      data: {id: 'conditional-logic-dialog', entity: {value: this.form.controls.branching_logic?.value}, mode: DialogMode.EDIT},
      panelClass: 'tailwind-slide-panel',
      width: '70%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription =
      dialogRef.componentInstance.dialogActionEvent.subscribe(
        (value) => {
          console.log('Class: QuestionFormGroupComponent, Function: , Line 190 value' , value);
          this.form.patchValue({branching_logic: value.entity?.value});
          // const _entity = value.entity;
          // const _action = value.action;
          // if (!_entity) {
          //   // this.configService.setLatestFormEntry(null);
            dialogRef.close();
          //   // this.clearFragmentUrl();
          //   return;
          // }
          // // this.configService.setLatestFormEntry(_entity);
          // this.processDialogAction(_action, _entity).subscribe({
          //   next: (res) => {
          //     // this.configService.setLatestFormEntry(null);
          //     const entity = res ?? _entity;
          //     this.dialogUpdateEvent.set({mode, entity})
          //     dialogRef.close();
          //     setTimeout(() => {
          //       this.dialogUpdateEvent.set(undefined);
          //     })
          //   },
          //   error: (error: HttpErrorResponse) => {
          //     this.configService.setLatestFormEntry(null);
          //     dialogRef.componentInstance.errorHappened(error)
          //   },
          // });
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  // protected selectQuestion() {
  //   this.editMode.set(!this.editMode());
  //   this.questionnaireStateService.selectedQuestionIndex.set(this.editMode() ? this.questionIndex() : undefined);
  // }
  protected readonly ValidatorError = ValidatorError;
  protected selected = false;

  // protected onEdit() {
  //   this.selected = true;
  // }
  //
  // protected removeQuestion() {
  //
  // }
}
