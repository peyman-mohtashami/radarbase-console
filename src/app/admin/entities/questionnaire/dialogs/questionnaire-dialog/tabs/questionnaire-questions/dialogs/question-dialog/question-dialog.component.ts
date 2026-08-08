import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewContainerRef,
  viewChild, ComponentRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {QUESTION_COMPONENTS, QUESTION_TYPES} from '../../components/question-type/question-type.registry';
import {
  ConditionalLogicDialogComponent
} from '../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  OPERATOR_SYMBOLS
} from '../conditional-logic/conditional-logic-operator-selector/conditional-logic-operator-selector.component';
import {
  requiredField
} from '../../../../../../../../../shared/utils/signal-form-validators';
import {applyEach, disabled, form, FormField, required, validate} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuestionChoicesComponent} from '../../components/question-choices/question-choices.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {TextFormGroupComponent} from '../../components/text-form-group/text-form-group.component';
import {ValidatorError} from '../../../../../../../../../shared/utils/validators';

export interface QuestionnaireQuestionForm {
  field_name: string;
  field_type: string;
  field_label: string;
  section_header: string
  required_field: boolean;
  field_note: string;
  matrix_group_name: string;
  conditionalLogic: {operand: string; operator: string; value: string}[][];
  select_choices_or_calculations: {code: string; label: string}[];
  // text_validation_type_or_show_slider_number?: string
  text_validation_min: string;
  text_validation_max: string
  field_annotation: {
    image: string
    timer: {
      start: string
      end: string
    }
    unit: string
  }
  range: {
    labelLeft?: string;
    labelRight?: string;
    max: string
    min: string
    step: string
  }
  // branching_logic?: string
  show_selected_label: boolean
  show_code: boolean
  multi_line: boolean;
  calculation_fn: string;
  calculation_args: string;
  date_type: string
}

@Component({
  selector: 'app-question-dialog',
  imports: [
    MatDialogContent,
    TranslatePipe,
    MatButton,
    MatFormField,
    MatError,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatDialogTitle,
    FormField,
    FormsModule,
    QuestionChoicesComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    ReactiveFormsModule,
    TextFormGroupComponent,
  ],
  templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit, AfterViewInit {
  protected readonly QUESTION_TYPES = QUESTION_TYPES;
  protected readonly DialogMode = DialogMode;

  protected store = inject(QuestionnaireStore);
  protected dialogState = inject(QuestionnaireDialogStateService);
  protected dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<QuestionDialogComponent>);

  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppQuestion;
    questions: AppQuestion[];
    index: number;
    matrixIndex?: number;
  };

  private model = signal<QuestionnaireQuestionForm>({ //this.dialogData.restoredModel ??{
    ...this.dialogData.entity,
    field_name: this.dialogData.entity.field_name ?? '',
    field_type: this.dialogData.entity.field_type ?? '',
    field_label: this.dialogData.entity.field_label[this.dialogState.language().code] ?? '',
    section_header: this.dialogData.entity.section_header?.[this.dialogState.language().code] ?? '',
    required_field: this.dialogData.entity.required_field === 'true',
    field_note: this.dialogData.entity.field_note?.[this.dialogState.language().code] ?? '',
    matrix_group_name: this.dialogData.entity.matrix_group_name ?? '',
    // branching_logic: new FormControl<string>('', {nonNullable: true}),
    conditionalLogic: this.dialogData.entity.conditionalLogic ?? [],
    // select_choices_or_calculations: (this.dialogData.entity.select_choices_or_calculations ?? [])
    //   .map((choice) => withChoiceLanguages(choice, this.dialogState.questionnaire()?.languages ?? []))
    select_choices_or_calculations: this.dialogData.entity.select_choices_or_calculations?.map(c => ({code: c.code, label: c.label[this.dialogState.language().code]})) ?? [{code: '', label: ''}],
    // text_validation_type_or_show_slider_number: this.dialogData.entity.text_validation_type_or_show_slider_number ?? '',
    text_validation_min: this.dialogData.entity.text_validation_min ?? '',
    text_validation_max: this.dialogData.entity.text_validation_max ?? '',
    field_annotation: {
      image: this.dialogData.entity.field_annotation?.image ?? '',
      timer: {
        start: `${this.dialogData.entity.field_annotation?.timer?.start ?? ''}`,
        end: `${this.dialogData.entity.field_annotation?.timer?.end ?? ''}`
      },
      unit: this.dialogData.entity.field_annotation?.unit ?? ''
    },
    range: {
      labelLeft: this.dialogData.entity.range?.labelLeft?.[this.dialogState.language().code] ?? '',
      labelRight: this.dialogData.entity.range?.labelRight?.[this.dialogState.language().code] ?? '',
      max: `${this.dialogData.entity.range?.max ?? ''}`,
      min: `${this.dialogData.entity.range?.min ?? ''}`,
      step: `${this.dialogData.entity.range?.step ?? ''}`
    },
    // // branching_logic?: string
    show_selected_label: this.dialogData.entity.show_selected_label ?? false,
    show_code: this.dialogData.entity.show_code ?? false,
    multi_line: this.dialogData.entity.multi_line ?? false,
    calculation_fn: this.dialogData.entity.calculation_fn ?? '',
    calculation_args: this.dialogData.entity.calculation_args ?? '',
    date_type: this.dialogData.entity.date_type ?? ''
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.field_name);
    validate(schema.field_name, ({value}) => {
      const matchedFieldName = this.dialogData.questions?.find((question) => question.field_name === value());
      if (!matchedFieldName) return null;
      if (this.dialogData.entity?.field_name === value()) return null;
      return {
        kind: 'duplicate',
        message: 'SHARED.validatorError.duplicateName',
      };
    });
    requiredField(schema.field_type);
    disabled(schema.field_type);
    requiredField(schema.field_label);
    // this.hideTypeSpecificFields(schema);
    // hidden(schema.select_choices_or_calculations, {when: ({valueOf}) => valueOf(schema.field_type) === 'descriptive'});
    // hidden(schema.select_choices_or_calculations, {when: ({valueOf}) => valueOf(schema.field_type) === 'descriptive'});

    // applyEach(schema.select_choices_or_calculations, (choice) => {
    //   when(schema.field_type.required, () => {
    //     requiredField(choice.code);
    //     requiredField(choice.label);
    //   });
    // });
    // applyEach(schema.select_choices_or_calculations, (choice) => {
    //   requiredField(choice.code);
    //   requiredField(choice.label);
    // });
    applyEach(schema.select_choices_or_calculations, (choice) => {
      required(choice.code, {
        when: ({ valueOf }) => {
          const v = valueOf(schema.field_type);
          return v === 'info' || v === 'checkbox' || v === 'radio'
        }
      });

      required(choice.label, {
        when: ({ valueOf }) => {
          const v = valueOf(schema.field_type);
          return v === 'info' || v === 'checkbox' || v === 'radio'
        }
      });
    });
    // when(schema.field_type, ({ value }) => value === 'radio', () => {
    //   applyEach(schema.select_choices_or_calculations, (choice) => {
    //     requiredField(choice.code);
    //     requiredField(choice.label);
    //   });
    // });
  });

  // hideTypeSpecificFields(schema: any) {
  //   hidden(schema.show_selected_label, {when: ({valueOf}) => valueOf(schema.field_type) === 'descriptive'});
  //   hidden(schema.show_code, {when: ({valueOf}) => valueOf(schema.field_type) === 'descriptive'});
  //   hidden(schema.multi_line, {when: ({valueOf}) => valueOf(schema.field_type) === 'descriptive'});
  //   hidden(schema.calculation_fn, {when: ({valueOf}) => valueOf(schema.field_type) === 'descriptive'});
  //   hidden(schema.calculation_args, {when: ({valueOf}) => valueOf(schema.field_type) === 'descriptive'});
  //   hidden(schema.date_type, {when: ({valueOf}) => valueOf(schema.field_type) === 'descriptive'});
  // }

  // isSelectChoicesOrCalculationsHidden() {
  //   return this.schema.field_type() === 'descriptive';
  // }
  //
  // istext_validation_type_or_show_slider_numberHidden() {
  //   return this.schema.field_type() === 'descriptive';
  // }
  //
  // istext_validation_minHidden() {
  //   return this.schema.field_type() === 'descriptive';
  // }
  //
  // istext_validation_maxHidden() {
  //   return this.schema.field_type() === 'descriptive';
  // }
  //
  // isfield_annotationHidden() {
  //   return this.schema.field_type() === 'descriptive';
  // }
  //
  // isRangeHidden() {
  //
  // }
  //
  // isshow_selected_labelHIdden() {
  //
  // }
  // isshow_codeHidden() {}
  // isMultilineHidden() {}
  // calculation_fn: this.dialogData.entity.calculation_fn ?? '',
  // calculation_args: this.dialogData.entity.calculation_args ?? '',
  // date_type
  branchingLogicString = signal('');

  // host = viewChild('questionHost', { read: ViewContainerRef });

  // constructor() {
  //   effect(() => {
  //     const model = this.model();
  //
  //     this.dialogState.questionnaire.update(value => {
  //       const questions = value!.questions.map(q => {
  //         if (q.dragId === this.dialogData.entity.dragId) {
  //           return this.toAppQuestion(model);
  //         }
  //         return q;
  //       }) ?? [];
  //       return {
  //         ...value!,
  //         questions: [...questions],
  //       }
  //     })
  //   });
  // }

  ngAfterViewInit() {
    // this.loadQuestionEditor();
    animateDialogIn(this.dialogData.id);
  }

  // childFormValue: any;
  //
  // private loadQuestionEditor(): void {
  //   const host = this.host();
  //   if (!host) return;
  //
  //   host.clear();
  //
  //   const componentType = QUESTION_COMPONENTS[this.dialogData.entity.field_type];
  //   const componentRef = host.createComponent(componentType);
  //   componentRef.setInput('type', 'form');
  //   componentRef.setInput('entity', this.dialogData.entity);
  //   componentRef.setInput('index', this.dialogData.index);
  //   componentRef.instance.formEvent.subscribe((value: {isValid: boolean; formValue: any}) => {
  //     console.log('Class: QuestionDialogComponent, Function: , Line 262 value' , value);
  //     this.childFormValue = value;
  //   });
  // }

  ngOnInit() {
    this.dialogState.question.set(this.dialogData.entity);
    this.dialogState.questionIndex.set(this.dialogData.index);

    if (this.dialogData.entity) {
      this.branchingLogicString.set(this.dialogData.entity?.conditionalLogic?.map((conditionalLogicItems) =>
        conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
      ).join(' or ') ?? '');
    }
  }

  toAppQuestion(model: QuestionnaireQuestionForm): AppQuestion {
    const question = this.dialogData.entity;
    return {
      ...question,
      field_name: model.field_name,
      field_type: model.field_type,
      field_label: {
        ...question.field_label,
        [this.dialogState.language().code]: model.field_label
      },
      section_header: {
        ...question.section_header,
        [this.dialogState.language().code]: model.section_header
      },
      required_field: model.required_field ? 'true' : 'false',
      field_note: {
        ...question.field_note,
        [this.dialogState.language().code]: model.field_note
      },
      conditionalLogic: model.conditionalLogic,
      branching_logic: this.branchingLogicString(),
      select_choices_or_calculations: [
        ...(question.select_choices_or_calculations ?? []),
        ...model.select_choices_or_calculations.map(((c, i) => {
          return {
            code: c.code,
            label: {
              ...question.select_choices_or_calculations?.[i]?.label,
              [this.dialogState.language().code]: c.label
            }
          }
        }))
      ],
      isValid: this.form().valid()
    }
  }

  protected handleSaveAction(): void {
    const model = this.model();

    this.dialogState.questionnaire.update(value => {
      const questions = value!.questions.map(q => {
        if (q.dragId === this.dialogData.entity.dragId) {
          return this.toAppQuestion(model);//, ...this.childFormValue.formValue};
        }
        return q;
      }) ?? [];
      return {
        ...value!,
        questions: [...questions],
      }
    })

    this.close();
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  protected editConditionalLogic() {
    this.openConditionalLogicDialog();
  }

  openConditionalLogicDialog() {
    const dialogRef = this.dialog.open(ConditionalLogicDialogComponent, {
      id: 'conditional-logic-dialog',
      data: {id: 'conditional-logic-dialog', entity: this.model().conditionalLogic, questions: this.dialogData.questions, selectedIndex: this.dialogData.index, mode: DialogMode.EDIT},
      panelClass: 'tailwind-slide-panel',
      width: '60%',
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
          // const branchingLogicString = value.entity?.map((conditionalLogicItems) =>
          //   conditionalLogicItems.map(i => `[${i.operand}]${i.operator}'${i.value}'`).join(' and ')
          // ).join(' or ') ?? '';
          // this.form.patchValue({branching_logic: value.entity?.value});
          if (value.entity && value.action !== DialogMode.CLOSE) {

            this.branchingLogicString.set(value.entity?.map((conditionalLogicItems) =>
              conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
            ).join(' or ') ?? '');
            this.model.update(value => {
              return {
                ...value,
                conditionalLogic: value.conditionalLogic
              };
            })
            // this.form.patchValue({conditionalLogic: value.entity});
          }
          dialogRef.close();
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  protected readonly ValidatorError = ValidatorError;
}
