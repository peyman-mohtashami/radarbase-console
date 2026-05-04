import {Component, inject, input, output, signal} from '@angular/core';
import {
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, NG_VALIDATORS,
} from '@angular/forms';
import {MatIconButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect, MatOption} from "@angular/material/select";
import {TranslatePipe} from "@ngx-translate/core";
import {ChoicesFormArrayComponent} from "../choices-form-array/choices-form-array.component";
import {Validator as CustomValidator} from "../../../../../../../../shared/utils/validators";
import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {QuestionForm, QuestionFormAnnotation, QuestionFormRange} from "../../models/question-form";
import {AppQuestion} from "../../../../models/questionnaire";
import {QUESTION_TYPES} from "../../models/question-types";
import {QuestionnaireStateService} from "../../services/questionnaire-state.service";
import {TextFormGroupComponent} from "../text-form-group/text-form-group.component";
import {AnnotationFormGroupComponent} from "../annotation-form-group/annotation-form-group.component";
import {RangeFormGroupComponent} from "../range-form-group/range-form-group.component";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {DialogMode} from '../../../../../../../base-entities/enums/dialog';
import {TagComponent} from '../../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {
  BaseFormGroupComponent
} from '../../../../../../../base-entities/containers/entity-dialog/base-form-group.component';
import {MatDialog} from '@angular/material/dialog';
import {
  ConditionalLogicDialogComponent
} from '../../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';

@Component({
  selector: 'app-question-form-group',
  templateUrl: './question-form-group.component.html',
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
    TagComponent,
    MatTooltip,
    MatIcon,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: QuestionFormGroupComponent
    }, {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: QuestionFormGroupComponent
    }
  ]
})
export class QuestionFormGroupComponent extends BaseFormGroupComponent<AppQuestion> {

  questionnaireStateService = inject(QuestionnaireStateService);

  editMode = signal(false);
  protected readonly DialogMode = DialogMode;
  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  FIELD_TYPE_MAP: Record<string, string> = {
    'radio': 'Radio',
    'yesno': 'Yes/No',
    'checkbox': 'Checkbox',
    'text': 'Text Input',
    'datetime': 'Date/Time Input',
    'info': 'Info',
    'descriptive': 'Descriptive',
    'slider': 'Slider',
    'range': 'Range',
    'range-info': 'Range Info',
    'matrix-radio': 'Radio-Matrix',
    'timed': 'Timed',
    'audio': 'Audio',
  };

  languages = input.required<RadarOption[]>();
  questionIndex = input.required<number>();
  remove = output<void>();

  form = new FormGroup<Partial<QuestionForm>>({
    field_name: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_type: new FormControl('', {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    field_label: new FormControl<Record<string, string>>({}, {validators: [CustomValidator.requiredValidator], nonNullable: true}),
    section_header: new FormControl<Record<string, string>>({}, {nonNullable: true}),
    branching_logic: new FormControl<string>('', {nonNullable: true}),
  });

  constructor() {
    super();

    this.form.statusChanges.subscribe(() => {
      this.validatorChange();
    });

    this.form.controls.field_type?.valueChanges.subscribe(type => {
      this.updateFormControls(type);
      this.validatorChange();
    });
  }

  updateFormControls(type?: string) {
    if (!type) return;

    // ['text_validation_type_or_show_slider_number', 'text_validation_min', 'text_validation_max', 'field_annotation', 'select_choices_or_calculations', 'range'].forEach(controlName => {
    //   if (this.form.contains(controlName)) {
    //     this.form.removeControl(controlName as keyof QuestionForm);
    //   }
    // });

    if (type === 'timed') {
      this.form.addControl('field_annotation' as keyof QuestionForm, new FormControl<QuestionFormAnnotation | null>(null));
    } else {
      this.form.removeControl('field_annotation' as keyof QuestionForm);
    }
    if (type === 'slider') {
      this.form.addControl('range' as keyof QuestionForm, new FormControl<QuestionFormRange | null>(null));
    } else {
      this.form.removeControl('range' as keyof QuestionForm);
    }
    if (['radio', 'checkbox', 'info', 'range', 'slider', 'range-info'].includes(type)) {
      this.form.addControl('select_choices_or_calculations' as keyof QuestionForm, new FormControl([],{nonNullable: true, validators: [CustomValidator.requiredValidator]}));
    } else {
      this.form.removeControl('select_choices_or_calculations' as keyof QuestionForm);
    }
    if (['text'].includes(type)) {
      this.form.addControl('text_validation_type_or_show_slider_number' as keyof QuestionForm, new FormControl<string>(''));
      this.form.addControl('text_validation_min' as keyof QuestionForm, new FormControl<string>(''));
      this.form.addControl('text_validation_max' as keyof QuestionForm, new FormControl<string>(''));
    } else {
      this.form.removeControl('text_validation_type_or_show_slider_number' as keyof QuestionForm);
      this.form.removeControl('text_validation_min' as keyof QuestionForm);
      this.form.removeControl('text_validation_max' as keyof QuestionForm);
    }
    if (['datetime'].includes(type)) {
      this.form.addControl('text_validation_type_or_show_slider_number' as keyof QuestionForm, new FormControl<string>(''));
    } else {
      this.form.removeControl('text_validation_type_or_show_slider_number' as keyof QuestionForm);
    }
  }

  override writeValue(question: AppQuestion) {
    if (!question) {
      this.editMode.set(true);
    }
    this.updateFormControls(question?.field_type);
    super.writeValue(question);
  }

  protected dialog = inject(MatDialog);

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

  protected selectQuestion() {
    this.editMode.set(!this.editMode());
    this.questionnaireStateService.selectedQuestionIndex.set(this.editMode() ? this.questionIndex() : undefined);
  }
}
