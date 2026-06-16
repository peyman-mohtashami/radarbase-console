import {Component, effect, inject, input, OnDestroy, OnInit, output, untracked} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms';
import {MatIconButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {TranslatePipe} from "@ngx-translate/core";
// import {ChoicesFormArrayComponent} from "../choices-form-array/choices-form-array.component";
import {Validator as CustomValidator, ValidatorError} from "../../../../../../../../../shared/utils/validators";
import {AnnotationFormGroupComponent} from "../annotation-form-group/annotation-form-group.component";
import {RangeFormGroupComponent} from "../range-form-group/range-form-group.component";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TextFormGroupComponent} from '../../../components/text-form-group/text-form-group.component';
import {AppQuestion, AppQuestionChoice} from '../../../../../models/questionnaire';
import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {
  ConditionalLogicDialogComponent
} from '../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';
import {DialogMode} from '../../../../../../../../base-entities/enums/dialog';
import {QUESTION_TYPES} from '../models/question-types';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {QuestionChoices} from '../question-choices/question-choices';
// import {JsonPipe} from '@angular/common';

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
    // ChoicesFormArrayComponent,
    TextFormGroupComponent,
    AnnotationFormGroupComponent,
    RangeFormGroupComponent,
    MatRadioButton,
    MatRadioGroup,
    MatIcon,
    QuestionChoices,
    // JsonPipe,
  ],
})
export class QuestionComponent implements OnInit, OnDestroy {
  questions = input.required<AppQuestion[]>();
  entity = input.required<AppQuestion>();
  index = input.required<number>();
  languages = input.required<RadarOption[]>();
  language = input.required<RadarOption>();

  questionnaireStateService = inject(QuestionnaireStateService);

  protected readonly DialogMode = DialogMode;
  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  changeEvent = output<Partial<AppQuestion>>();
  validEvent = output<boolean>();

  form = new FormGroup({
    field_name: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_type: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_label: new FormControl<AppQuestion['field_label']>({}, {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    section_header: new FormControl<AppQuestion['section_header']>({}, {nonNullable: true}),
    text_validation_type_or_show_slider_number: new FormControl('', {nonNullable: true}),
    text_validation_min: new FormControl('', {nonNullable: true}),
    text_validation_max: new FormControl('', {nonNullable: true}),
    field_annotation: new FormControl<AppQuestion['field_annotation']>('', {nonNullable: true}),
    // select_choices_or_calculations: new FormControl<AppQuestion['select_choices_or_calculations']>([], {nonNullable: true}),
    range: new FormControl<AppQuestion['range'] | null>(null),
    branching_logic: new FormControl<string>('', {nonNullable: true}),
  });

  private subscription?: Subscription;

  constructor() {
    effect(() => {

      const index = this.index();
      // if (index !== null) {
        console.log('Class: QuestionComponent, Function: , Line 87 index' , index);
        untracked(() => {
          const entity = this.entity();
          console.log('Class: QuestionComponent, Function: , Line 91 entity' , entity);
          // this.form.setValue(entity);
          this.form.setValue({
            field_name: entity.field_name,
            field_type: entity.field_type,
            field_label: entity.field_label ?? {},
            section_header: entity.section_header ?? {},
            text_validation_type_or_show_slider_number:
              entity.text_validation_type_or_show_slider_number ?? '',
            text_validation_min: entity.text_validation_min ?? '',
            text_validation_max: entity.text_validation_max ?? '',
            field_annotation: entity.field_annotation ?? '',
            range: entity.range ?? null,
            branching_logic: entity.branching_logic ?? '',
          });
        });
        // this.form.patchValue(entity);
      // }
    });

      // this.valid.emit(this.form.valid);
    // this.form.statusChanges.subscribe(() => {
    //   // this.validatorChange();
    // });
    //
    // this.form.controls.field_type?.valueChanges.subscribe(type => {
    //   this.updateFormControls(type);
    //   // this.validatorChange();
    // });
  }

  ngOnInit() {
    this.form.controls.field_name.addValidators(this.duplicateValidator);
    this.form.controls.field_name.updateValueAndValidity();

    this.subscription = this.form.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(change => {
      this.changeEvent.emit({...change, range: change.range ?? undefined, valid: this.form.valid && this.checkChoicesValidity(this.entity().select_choices_or_calculations ?? [])});
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  protected onChoicesChange(event: AppQuestionChoice[]) {
    this.changeEvent.emit({select_choices_or_calculations: event, valid: this.form.valid && this.checkChoicesValidity(event)});
  }

  checkChoicesValidity(event: AppQuestionChoice[]) {
    return event.every(choice => choice.code && choice.code.trim() !== '');
  }

  private duplicateValidator = (control: AbstractControl) => {
    return (this.questions() ?? []).find(entity =>
      control.value === entity.field_name && this.entity()?.field_name !== entity.field_name
    )
      ? {duplicate: true}
      : null;
  }

  protected dialog = inject(MatDialog);

  protected editConditionalLogic() {
   this.openConditionalLogicDialog();
  }

  openConditionalLogicDialog() {
    const dialogRef = this.dialog.open(ConditionalLogicDialogComponent, {
      id: 'conditional-logic-dialog',
      data: {id: 'conditional-logic-dialog', entity: {value: this.form.controls.branching_logic?.value}, questions: this.questions(), selectedIndex: this.index(), mode: DialogMode.EDIT},
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
          dialogRef.close();
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  protected readonly ValidatorError = ValidatorError;
  protected selected = false;

}
