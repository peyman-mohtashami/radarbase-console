import {
  AfterViewInit,
  Component, computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {QUESTION_TYPES} from '../../../questionnaire-preview/question-type/question-type.registry';
import {
  ConditionalLogicDialogComponent, OPERATOR_SYMBOLS
} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  requiredField
} from '../../../../../../../../../shared/utils/signal-form-validators';
import {applyEach, disabled, FieldTree, form, FormField, required, validate} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {QuestionChoicesComponent} from './question-choices/question-choices.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';

export interface QuestionnaireQuestionForm {
  field_name: string;
  field_type: string;
  field_label: Record<string, string>;
  section_header: Record<string, string>
  required_field: boolean;
  field_note: Record<string, string>
  matrix_group_name: string;
  conditionalLogic: {operand: string; operator: string; value: string}[][];
  select_choices_or_calculations: {code: string; label: Record<string, string>}[];
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
    labelLeft: Record<string, string>
    labelRight: Record<string, string>
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
    QuestionChoicesComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
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

  lang = computed(() => {
    return this.dialogState.questionnaire()!.defaultLanguage!.code;
  })

  private model = signal<QuestionnaireQuestionForm>({ //this.dialogData.restoredModel ??{
    ...this.dialogData.entity,
    field_name: this.dialogData.entity.field_name ?? '',
    field_type: this.dialogData.entity.field_type ?? '',
    // field_label: this.dialogData.entity.field_label[this.dialogState.language().code] ?? '',
    field_label: this.dialogData.entity?.field_label?.[this.lang()] ? this.dialogData.entity!.field_label! : {...this.dialogData.entity?.field_label, [this.lang()]: ''},
    // section_header: this.dialogData.entity.section_header?.[this.dialogState.language().code] ?? '',
    section_header: this.dialogData.entity?.section_header?.[this.lang()] ? this.dialogData.entity!.section_header! : {...this.dialogData.entity?.section_header, [this.lang()]: ''},
    required_field: this.dialogData.entity.required_field ?? true,
    // field_note: this.dialogData.entity.field_note?.[this.dialogState.language().code] ?? '',
    field_note: this.dialogData.entity?.field_note?.[this.lang()] ? this.dialogData.entity!.field_note! : {...this.dialogData.entity?.field_note, [this.lang()]: ''},
    matrix_group_name: this.dialogData.entity.matrix_group_name ?? '',
    // branching_logic: new FormControl<string>('', {nonNullable: true}),
    conditionalLogic: this.dialogData.entity.conditionalLogic ?? [],
    // select_choices_or_calculations: this.dialogData.entity.select_choices_or_calculations?.map(c => ({code: c.code, label: c.label[this.dialogState.language().code]})) ?? [{code: '', label: ''}],
    select_choices_or_calculations: this.dialogData.entity.select_choices_or_calculations?.map(c => ({code: c.code, label: c.label?.[this.lang()] ? c.label! : {...c.label, [this.lang()]: ''}})) ?? [{code: '', label: {[this.lang()]: ''}}],
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
      labelLeft: this.dialogData.entity?.range?.labelLeft?.[this.lang()] ? this.dialogData.entity!.range.labelLeft! : {...this.dialogData.entity?.range?.labelLeft, [this.lang()]: ''},//this.dialogData.entity.range?.labelLeft?.[this.dialogState.language().code] ?? '',
      labelRight: this.dialogData.entity?.range?.labelRight?.[this.lang()] ? this.dialogData.entity!.range.labelRight! : {...this.dialogData.entity?.range?.labelRight, [this.lang()]: ''},//this.dialogData.entity.range?.labelLeft?.[this.dialogState.language().code] ?? '',
      // labelRight: this.dialogData.entity.range?.labelRight?.[this.dialogState.language().code] ?? '',
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
    applyEach(schema.select_choices_or_calculations, (choice) => {
      required(choice.code, {
        when: ({ valueOf }) => {
          const v = valueOf(schema.field_type);
          return v === 'info' || v === 'checkbox' || v === 'radio' || v === 'range'
        }
      });

      required(choice.label, {
        when: ({ valueOf }) => {
          const v = valueOf(schema.field_type);
          return v === 'info' || v === 'checkbox' || v === 'radio' || v === 'range'
        }
      });
    });
    required(schema.range.min, {
      when: ({ valueOf }) => {
        const v = valueOf(schema.field_type);
        return v === 'slider'
      }
    });
    required(schema.range.max, {
      when: ({ valueOf }) => {
        const v = valueOf(schema.field_type);
        return v === 'slider'
      }
    });
    required(schema.range.step, {
      when: ({ valueOf }) => {
        const v = valueOf(schema.field_type);
        return v === 'slider'
      }
    });
    required(schema.field_annotation.image, {
      when: ({ valueOf }) => {
        const v = valueOf(schema.field_type);
        return v === 'timed'
      }
    });
    required(schema.field_annotation.timer.start, {
      when: ({ valueOf }) => {
        const v = valueOf(schema.field_type);
        return v === 'timed'
      }
    });
    required(schema.field_annotation.timer.end, {
      when: ({ valueOf }) => {
        const v = valueOf(schema.field_type);
        return v === 'timed'
      }
    });
    required(schema.field_annotation.unit, {
      when: ({ valueOf }) => {
        const v = valueOf(schema.field_type);
        return v === 'timed'
      }
    });
    required(schema.calculation_fn, {
      when: ({ valueOf }) => {
        const v = valueOf(schema.field_type);
        return v === 'calc'
      }
    });
    // required(schema.calculation_args, {
    //   when: ({ valueOf }) => {
    //     const v = valueOf(schema.field_type);
    //     return v === 'calc'
    //   }
    // });

  });

  branchingLogicString = signal('');

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

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
    const entity = this.dialogData.entity;

    return {
      ...entity,
      ...model,
      isValid: this.form().valid()
    }
  }

  protected handleSaveAction(): void {
    const model = this.model();

    this.dialogState.questionnaire.update(value => {
      const questions = value!.questions.map(q => {
        if (q.id === this.dialogData.entity.id) {
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

  protected onValidationDatePicked(
    event: MatDatepickerInputEvent<Date>,
    field: FieldTree<string, string, "writable">
  ) {
    const value = event.value;

    if (!value) {
      return;
    }

    field().value.update(() => {
      return value.toISOString();
    });

    // control.setValue(this.formatDateForValidation(value));
    // control.markAsDirty();
    // control.markAsTouched();
  }

  // private formatDateForValidation(value: Date): string {
  //   return value.toISOString();
  // }

}
