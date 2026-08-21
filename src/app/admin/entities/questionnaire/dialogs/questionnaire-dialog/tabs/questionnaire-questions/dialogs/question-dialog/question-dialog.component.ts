import {
  AfterViewInit,
  Component, computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AppQuestion, AppQuestionConditionalLogic, QuestionType} from '../../../../../../models/questionnaire';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  identifierField,
  requiredField, RequiredWhen, validateDuplicate, validateMaxMin, validateMinMax, validateTemplateVariables
} from '../../../../../../../../../shared/utils/signal-form-validators';
import {
  applyEach,
  disabled,
  form,
  FormField,
  validate
} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {QuestionChoicesComponent} from './question-choices/question-choices.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {checkValidation, QUESTION_TYPES} from '../../questionnaire-questions.component';
import {withLanguage} from '../../../questionnaire-custom-messages/questionnaire-custom-messages.component';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {UpperCasePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionComponent} from '../../../questionnaire-preview/question/question.component';
import {ToolbarComponent} from '../../../questionnaire-preview/components/toolbar/toolbar.component';
import {QuestionsStore} from '../../services/questions.store';
import {PreviewStore} from '../../../questionnaire-preview/services/preview.store';
import {AnswerWithTimeLog} from '../../../questionnaire-preview/models/kafka';
import {QuestionConditionalLogicComponent} from './question-conditional-logic/question-conditional-logic.component';
import {QuestionTemplateVariablesComponent} from './question-template-variables/question-template-variables.component';

export interface QuestionnaireQuestionForm extends Record<string, unknown> {
  field_name: string;
  field_type: string;
  field_label: Record<string, string>;
  section_header: Record<string, string>
  required_field: boolean;
  field_note: Record<string, string>
  matrix_group_name: string;
  conditionalLogic: AppQuestionConditionalLogic;
  select_choices_or_calculations: { code: string; label: Record<string, string> }[];
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
  show_selected_label: boolean
  show_code: boolean
  multi_line: boolean;
  calculation_fn: string;
  calculation_args: string;
  isActive: boolean;
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
    TagComponent,
    UpperCasePipe,
    MatTooltip,
    QuestionComponent,
    ToolbarComponent,
    QuestionConditionalLogicComponent,
    QuestionTemplateVariablesComponent,
  ],
  templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit, AfterViewInit {
  protected readonly QuestionType = QuestionType;
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

  previewState = inject(PreviewStore);

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
    isActive: this._question.isActive ?? false,
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.field_name);
    identifierField(schema.field_name);
    validateDuplicate(schema.field_name, this.dialogData.questions, this._question, 'field_name');

    requiredField(schema.field_type);
    disabled(schema.field_type);

    requiredField(schema.field_label[this._lang]);
    validateTemplateVariables(schema.field_label[this._lang], this.store.selected()?.variables, this.dialogData.questions, this.dialogData.index);

    validateTemplateVariables(schema.section_header[this._lang], this.store.selected()?.variables, this.dialogData.questions, this.dialogData.index);
    validateTemplateVariables(schema.field_note[this._lang], this.store.selected()?.variables, this.dialogData.questions, this.dialogData.index);

    applyEach(schema.select_choices_or_calculations, (choice) => {
      const whenRequired: RequiredWhen = ({valueOf}) => [QuestionType.INFO, QuestionType.CHECKBOX, QuestionType.RADIO, QuestionType.RANGE].includes(valueOf(schema.field_type) as QuestionType);
      requiredField(choice.code, {when: whenRequired});
      requiredField(choice.label[this._lang], {when: whenRequired});
    });

    requiredField(schema.range.min, {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.SLIDER});
    requiredField(schema.range.max, {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.SLIDER});
    requiredField(schema.range.step, {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.SLIDER});

    validateMinMax(schema.range.min, schema.range.max, 'number', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.SLIDER});
    validateMaxMin(schema.range.max, schema.range.min, 'number', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.SLIDER});

    validate(schema.range.step, ({value, valueOf}) => {
      if (valueOf(schema.field_type) !== QuestionType.SLIDER) return null;

      const step = Number(value());

      if (Number.isNaN(step)) return null;
      if (step > 0) return null;

      return {
        kind: 'rangeStepPositive',
        message: 'Step must be positive',
      };
    });

    validateMinMax(schema.text_validation_min, schema.text_validation_max, 'number', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.NUMBER});
    validateMaxMin(schema.text_validation_max, schema.text_validation_min, 'number', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.NUMBER});

    validateMinMax(schema.text_validation_min, schema.text_validation_max, 'date', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.DATE});
    validateMaxMin(schema.text_validation_max, schema.text_validation_min, 'date', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.DATE});

    validateMinMax(schema.text_validation_min, schema.text_validation_max, 'time', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.TIME});
    validateMaxMin(schema.text_validation_max, schema.text_validation_min, 'time', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.TIME});

    requiredField(schema.field_annotation.timer.start, {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.TIMED});
    requiredField(schema.field_annotation.timer.end, {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.TIMED});

    validateMinMax(schema.field_annotation.timer.start, schema.field_annotation.timer.end, 'number', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.TIMED});
    validateMaxMin(schema.field_annotation.timer.end, schema.field_annotation.timer.start, 'number', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.TIMED});

    requiredField(schema.calculation_fn, {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.CALC});

    // required(schema.calculation_args, {
    //   when: ({ valueOf }) => {
    //     const v = valueOf(schema.field_type);
    //     return v === 'calc'
    //   }
    // });

  });

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  ngOnInit() {
    this.questionsStore.question.set(this._question);
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
    }
    switch (question.field_type) {
      case QuestionType.TEXT:
        updatedQuestion.multi_line = question.multi_line;
        break;
      case QuestionType.NUMBER:
      case QuestionType.DATE:
      case QuestionType.TIME:
        updatedQuestion.text_validation_min = question.text_validation_min;
        updatedQuestion.text_validation_max = question.text_validation_max;
        break;
      case QuestionType.CHECKBOX:
      case QuestionType.RADIO:
      case QuestionType.INFO:
        updatedQuestion.select_choices_or_calculations = question.select_choices_or_calculations;
        break;
      case QuestionType.RANGE:
        updatedQuestion.select_choices_or_calculations = question.select_choices_or_calculations;
        updatedQuestion.show_selected_label = question.show_selected_label;
        updatedQuestion.show_code = question.show_code;
        break;
      case QuestionType.SLIDER:
        updatedQuestion.range = question.range ? {
          min: question.range?.min,
          max: question.range?.max,
          step: question.range?.step,
          labelLeft: question.range.labelLeft?.[this._lang] ? question.range.labelLeft : undefined,
          labelRight: question.range.labelRight?.[this._lang] ? question.range.labelRight : undefined,
        } : undefined;
        break;
      case QuestionType.TIMED:
        updatedQuestion.field_annotation = question.field_annotation;
        break;
      case QuestionType.CALC:
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
    this.questionsStore.question.set(null);
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  async onAnswer(answer: AnswerWithTimeLog): Promise<void> {
    const answers = this.previewState.answers();
    answers[answer.id] = [answer];
    this.previewState.answers.set({...answers});
  }

  protected updateConditionalLogic(conditionalLogic: AppQuestionConditionalLogic) {
    this.model.update(value => {
      return {
        ...value,
        conditionalLogic,
      };
    })
  }
}
