import {
  AfterViewInit, ChangeDetectorRef,
  Component, computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AppQuestion, AppQuestionConditionalLogic} from '../../../../../../models/questionnaire';
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
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  requiredField
} from '../../../../../../../../../shared/utils/signal-form-validators';
import {
  applyEach,
  disabled,
  FieldTree,
  form,
  FormField,
  PathKind,
  required,
  SchemaPath, SchemaPathRules,
  validate
} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {QuestionChoicesComponent} from './question-choices/question-choices.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {checkValidation} from '../../questionnaire-questions.component';
import {withLanguage} from '../../../questionnaire-custom-messages/questionnaire-custom-messages.component';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {UpperCasePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionTemplateVariable} from '../../../questionnaire-variables/model/template-field.model';
import {QuestionComponent} from '../../../questionnaire-preview/question/question.component';
import {ToolbarComponent} from '../../../questionnaire-preview/toolbar/toolbar.component';
import {
  VariableDialogComponent
} from '../../../questionnaire-variables/dialogs/variable-dialog/variable-dialog.component';
import {
  MatChip,
  MatChipSet, MatChipsModule
} from '@angular/material/chips';
import {QuestionsStore} from '../../services/questions.store';

export interface QuestionnaireQuestionForm extends Record<string, any>{
  field_name: string;
  field_type: string;
  field_label: Record<string, string>;
  // fieldLabelVariables?: QuestionTemplateVariable[];
  section_header: Record<string, string>
  required_field: boolean;
  field_note: Record<string, string>
  matrix_group_name: string;
  conditionalLogic: AppQuestionConditionalLogic;
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
  date_type: string;
  isActive: boolean;
  // variables: QuestionTemplateVariable[];
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
    CdkTextareaAutosize,
    TagComponent,
    UpperCasePipe,
    MatTooltip,
    QuestionComponent,
    ToolbarComponent,
    MatChipSet,
    MatChip,
    MatChipsModule,
  ],
  templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit, AfterViewInit {
  protected readonly QUESTION_TYPES = QUESTION_TYPES;
  protected readonly DialogMode = DialogMode;

  protected store = inject(QuestionnaireStore);
  protected questionsStore = inject(QuestionsStore);
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
    return this.store.selected()!.defaultLanguage.code;
  })

  _question = this.dialogData.entity;
  _lang = this.lang();

  // variables = signal<Record<string, QuestionTemplateVariable[]>>(this._question.variables ?? {});
  variables: Record<string, QuestionTemplateVariable[]> = this._question.variables ?? {};

  protected model = signal<QuestionnaireQuestionForm>({ //this.dialogData.restoredModel ??{
    ...this._question,
    field_name: this._question.field_name ?? '',
    field_type: this._question.field_type ?? '',
    field_label: withLanguage(this._question?.field_label, this._lang),
    section_header: withLanguage(this._question?.section_header, this._lang),
    required_field: this._question.required_field ?? true,
    field_note: withLanguage(this._question?.field_note, this._lang),
    matrix_group_name: this._question.matrix_group_name ?? '',
    conditionalLogic: this._question.conditionalLogic ?? [],
    select_choices_or_calculations: this._question.select_choices_or_calculations?.map(c =>
      ({code: c.code, label: withLanguage(c.label, this._lang)})) ?? [{code: '', label: {[this._lang]: ''}}],
    text_validation_min: this._question.text_validation_min ?? '',
    text_validation_max: this._question.text_validation_max ?? '',
    field_annotation: {
      image: this._question.field_annotation?.image ?? '',
      timer: {
        start: `${this._question.field_annotation?.timer?.start ?? ''}`,
        end: `${this._question.field_annotation?.timer?.end ?? ''}`
      },
      unit: this._question.field_annotation?.unit ?? ''
    },
    range: {
      labelLeft: withLanguage(this._question?.range?.labelLeft, this._lang),
      labelRight: withLanguage(this._question?.range?.labelRight, this._lang),
      max: `${this._question.range?.max ?? ''}`,
      min: `${this._question.range?.min ?? ''}`,
      step: `${this._question.range?.step ?? ''}`
    },
    show_selected_label: this._question.show_selected_label ?? false,
    show_code: this._question.show_code ?? false,
    multi_line: this._question.multi_line ?? false,
    calculation_fn: this._question.calculation_fn ?? '',
    calculation_args: this._question.calculation_args ?? '',
    date_type: this._question.date_type ?? 'date',
    isActive: this._question.isActive ?? false,
    // variables: this._question.variables ?? []
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.field_name);
    validate(schema.field_name, ({value}) => {
      const matchedFieldName = this.dialogData.questions?.find((question) => question.field_name === value());
      if (!matchedFieldName) return null;
      if (this._question?.field_name === value()) return null;
      return {
        kind: 'duplicate',
        message: 'SHARED.validatorError.duplicateName',
      };
    });
    requiredField(schema.field_type);
    disabled(schema.field_type);
    requiredField(schema.field_label[this.lang()]);
    this.validateTemplateVariables(schema.field_label[this.lang()], 'field_label');
    // validate(schema.field_label[this.lang()], ({value}) => {
    //   const variables = this.parseAndValidateTemplateVariables(value());
    //
    //   if (variables) {
    //     this.variables['field_label'] = variables;
    //     return null;
    //   }
    //
    //   return {
    //     kind: 'wrongTemplateVariable',
    //     message: 'SHARED.validatorError.wrongTemplateVariable',
    //   };
    // });
    // validate(schema.field_label, ({value}) => {
    //   const v = this.validateTemplateVariables(value()[this._lang], this.model().fieldLabelVariables);
    //   if (v) return null;
    //   return {
    //     kind: 'wrongTemplateVariable',
    //     message: 'SHARED.validatorError.wrongTemplateVariable',
    //   };
    // });
    this.validateTemplateVariables(schema.section_header[this.lang()], 'section_header');
    this.validateTemplateVariables(schema.field_note[this.lang()], 'field_note');

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
    // required(schema.field_annotation.image, {
    //   when: ({ valueOf }) => {
    //     const v = valueOf(schema.field_type);
    //     return v === 'timed'
    //   }
    // });
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
    // required(schema.field_annotation.unit, {
    //   when: ({ valueOf }) => {
    //     const v = valueOf(schema.field_type);
    //     return v === 'timed'
    //   }
    // });
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

  private cdr = inject(ChangeDetectorRef)

  private validateTemplateVariables<TValue, TPathKind extends PathKind = PathKind.Root>(
    path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>, name: string
  ): void {
    validate(path, ({value}) => {
      const variables = this.parseAndValidateTemplateVariables(value() as string, name);

      if (variables) {
        this.variables = {
          ...this.variables,
          [name]: variables
        }
        return null;
      }

      return {
        kind: 'wrongTemplateVariable',
        message: 'SHARED.validatorError.wrongTemplateVariable',
      };
    });
  }


  private parseAndValidateTemplateVariables(value: string, name: string): QuestionTemplateVariable[] | null {
    const matches = [...value.matchAll(/\{\{([^{}]*)\}\}/g),];

    const stripped = value.replace(/\{\{([^{}]*)\}\}/g,'',);

    // Detect unmatched {{
    if (stripped.includes('{{') || stripped.includes('}}')) return null;

    const variables: QuestionTemplateVariable[] = [];

    for (const match of matches) {
      const id = match[1].trim();
      if (!id) return null;

      const variable = this.variables[name]?.find(item => item.name === id);
      if (!variable) return null;

      if (!isValidTemplateVariable(variable)) return null;
      variables.push(variable);
    }
    return variables;
  }


  branching_logic = computed(() => {
    const model = this.model();
    return model.conditionalLogic?.map((conditionalLogicItems) =>
      conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
    ).join(' or ') ?? '';
  })

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  ngOnInit() {
    this.questionsStore.question.set(this._question);
    // this.dialogState.questionIndex.set(this.dialogData.index);
  }

  toAppQuestion(model: QuestionnaireQuestionForm): AppQuestion {
    const entity = this._question;
    return this.normalizeQuestion({
      ...entity,
      ...model,
      isValid: this.form().valid()
    });
  }

  normalizeQuestion(question: AppQuestion) {
    const updatedQuestion: AppQuestion = {
      id: question.id,
      field_name: question.field_name,
      field_type: question.field_type,
      field_label: question.field_label,
      section_header: question.section_header?.[this._lang] ? question.section_header : undefined,
      required_field: question.required_field,
      field_note: question.field_note?.[this._lang] ? question.field_note : undefined,
      matrix_group_name: question.matrix_group_name || '',
      conditionalLogic: question.conditionalLogic?.length ? question.conditionalLogic : undefined,
      branching_logic: question.branching_logic || undefined,
      isActive: question.isActive,
      isValid: question.isValid,
      variables: this.variables,//question.variables,
    }
    switch (question.field_type) {
      case 'text':
        updatedQuestion.multi_line = question.multi_line;
        break;
      case 'number':
        updatedQuestion.text_validation_min = question.text_validation_min;
        updatedQuestion.text_validation_max = question.text_validation_max;
        break;
      case 'datetime':
        updatedQuestion.text_validation_min = question.text_validation_min;
        updatedQuestion.text_validation_max = question.text_validation_max;
        updatedQuestion.date_type = question.date_type;
        break;
      case 'checkbox':
      case 'radio':
      case 'info':
        updatedQuestion.select_choices_or_calculations = question.select_choices_or_calculations;
        break;
      case 'range':
        updatedQuestion.select_choices_or_calculations = question.select_choices_or_calculations;
        updatedQuestion.show_selected_label = question.show_selected_label;
        updatedQuestion.show_code = question.show_code;
        break;
      case 'slider':
        updatedQuestion.range = question.range ? {
          min: question.range?.min,
          max: question.range?.max,
          step: question.range?.step,
          labelLeft: question.range.labelLeft?.[this._lang] ? question.range.labelLeft : undefined,
          labelRight: question.range.labelRight?.[this._lang] ? question.range.labelRight : undefined,
        } : undefined;
        break;
      case 'timed':
        updatedQuestion.field_annotation = question.field_annotation;
        break;
      case 'calc':
        updatedQuestion.calculation_fn = question.calculation_fn;
        updatedQuestion.calculation_args = question.calculation_args;
        break;
      default:
        return updatedQuestion;
    }
    return updatedQuestion;
  }

  protected handleSaveAction(): void {
    const model = this.model();

    this.store.selected.update(value => {
      const questions = value!.questions.map(q => {
        if (q.id === this._question.id) {
          return this.toAppQuestion(model);
        }
        return q;
      }) ?? [];
      const validated = checkValidation(questions);
      return {
        ...value!,
        questions: [...validated],
        isQuestionsTabValid: validated.every(q => q.isValid)
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
        (conditionalLogicValue) => {
          if (conditionalLogicValue.entity && conditionalLogicValue.action !== DialogMode.CLOSE) {
            this.model.update(value => {
              return {
                ...value,
                conditionalLogic: conditionalLogicValue.entity ?? []
              };
            })
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

  protected editVariable(field: string, entity: QuestionTemplateVariable) {
    const dialogRef = this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode: 'edit', entity, questionIndex: this.dialogData.index},
      panelClass: 'tailwind-slide-panel',
      width: '40%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription = dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        console.log('Class: QuestionDialogComponent, Function: , Line 573 variable' , variable);
        if (!variable) {
          return;
        }

        let oldVariable: string;
        this.variables = {
          ...this.variables,
          [field]: this.variables[field].map(v => {
            if (v.id === variable.id) {
              oldVariable = v.name;
              return variable;
            } else{
              return v
            }
          })
        }
        this.cdr.markForCheck();
        this.model.update(value => {
          const text = value[field][this._lang];
          const regex = new RegExp(`{{\\s*${oldVariable}\\s*}}`, 'g');
          const updated = text.replace(regex, `{{${variable.name}}}`);
          return {
            ...value,
            [field]: {
              ...value[field],
              [this._lang]: updated
            }
          }
        })
      },
    );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  protected insertVariable(
    field: string,
    input: HTMLTextAreaElement,
  ): void {
    const dialogRef = this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode: 'add', questionIndex: this.dialogData.index},
      panelClass: 'tailwind-slide-panel',
      width: '40%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription = dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        if (!variable) {
          return;
        }
        this.variables = {
          ...this.variables,
          [field]: [...this.variables[field], variable]//.map(v => v.id === variable.id ? variable : v)
        }
        this.cdr.markForCheck();
        this.insertVariableAtCursor(field, input, variable);
      },
    );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  private insertVariableAtCursor(
    field: string,
    input: HTMLTextAreaElement,
    variable: QuestionTemplateVariable,
  ): void {
    const placeholder = `{{${variable.name}}}`;

    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;

    const editedText = input.value.substring(0, start) + placeholder + input.value.substring(end);

    this.updateModel(field, editedText);

    requestAnimationFrame(() => {
      const cursorPosition = start + placeholder.length;

      input.focus();
      input.setSelectionRange(
        cursorPosition,
        cursorPosition,
      );
    });
  }

  updateModel(field: string, editedText: string) {
    this.model.update(value => {
      switch (field) {
        case 'field_label':
          return {
            ...value,
            field_label: {
              ...value.field_label,
              [this._lang]: editedText,
            },
          }
        case 'section_header':
          return {
            ...value,
            section_header: {
              ...value.section_header,
              [this._lang]: editedText,
            },
          }
        case 'field_note':
          return {
            ...value,
            field_note: {
              ...value.field_note,
              [this._lang]: editedText,
            },
          }
      }
      return {
        ...value,
        field_label: {
          ...value.field_label,
          [this._lang]: editedText,
        },
        // variables: [
        //   ...value.variables,
        //   variable,
        // ],
      }
    })
  }
}


export function isValidTemplateVariable(variable: QuestionTemplateVariable): boolean {
  if (!variable.id) return false;
  if (variable.type !== 'question') return false;
  if (!variable.questionId) return false;
  if (variable.start && variable.end && variable.start > variable.end) return false;
  return true;
}
