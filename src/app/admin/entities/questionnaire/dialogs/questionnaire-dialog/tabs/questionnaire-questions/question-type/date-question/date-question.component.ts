import {Component, effect, inject, input, output, signal,} from '@angular/core';
import {
  AppQuestion,
  AppQuestionConditionalLogic,
  AppQuestionnaire, AppQuestionnaireLanguage,
  QuestionType
} from '../../../../../../models/questionnaire';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  identifierField,
  requiredField,
  validateDuplicate,
  validateMaxMin,
  validateMinMax,
  validateTemplateVariables
} from '../../../../../../../../../shared/utils/signal-form-validators';
import {disabled, form, FormField} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {UpperCasePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionComponent} from '../../../questionnaire-preview/components/question/question.component';
import {ToolbarComponent} from '../../../questionnaire-preview/components/toolbar/toolbar.component';
import {QuestionsStore} from '../../services/questions.store';
import {PreviewStore} from '../../../questionnaire-preview/services/preview.store';
import {AnswerWithTimeLog} from '../../../questionnaire-preview/models/kafka';
import {QUESTION_TYPES, withLanguage} from '../../../../services/utils';
import {HtmlEditorComponent} from '../../../../../../../../../shared/components/html-editor/html-editor.component';
import {
  QuestionConditionalLogicComponent
} from '../../dialogs/question-dialog/question-conditional-logic/question-conditional-logic.component';

export interface QuestionnaireDateQuestionForm extends Record<string, unknown> {
  id: string;
  field_name: string;
  field_type: string;
  field_label: Record<string, string>;
  section_header: Record<string, string>
  required_field: boolean;
  field_note: Record<string, string>
  matrix_group_name: string;
  conditionalLogic: AppQuestionConditionalLogic;
  text_validation_min: string;
  text_validation_max: string
  isActive: boolean;
}

@Component({
  selector: 'app-date-question',
  imports: [
    TranslatePipe,
    MatFormField,
    MatError,
    MatInput,
    MatIcon,
    MatSelect,
    MatOption,
    MatSlideToggle,
    FormField,
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
    HtmlEditorComponent,
  ],
  templateUrl: './date-question.component.html'
})
export class DateQuestionComponent {
  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  protected store = inject(QuestionnaireStore);
  protected questionsStore = inject(QuestionsStore);

  matrixIndex = input<number>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  valueChange = output<AppQuestion>();

  _questionnaire = this.store.selected()!;
  _lang = this._questionnaire.defaultLanguage.code;

  _question = this.questionsStore.question()!;
  _index = this.questionsStore.index()!;
  _questions = this.store.selected()!.questions;

  previewState = inject(PreviewStore);

  protected model = signal<QuestionnaireDateQuestionForm>({ //this.dialogData.restoredModel ??{
    ...this._question,
    id: this._question.id ?? crypto.randomUUID(),
    field_name: this._question.field_name ?? '',
    field_type: this._question.field_type ?? '',
    field_label: withLanguage(this._question?.field_label, this._lang),
    section_header: withLanguage(this._question?.section_header, this._lang),
    required_field: this._question.required_field ?? true,
    field_note: withLanguage(this._question?.field_note, this._lang),
    matrix_group_name: this._question.matrix_group_name ?? '',
    conditionalLogic: this._question.conditionalLogic ?? [],
    text_validation_min: this._question.text_validation_min ?? '',
    text_validation_max: this._question.text_validation_max ?? '',
    isActive: this._question.isActive ?? false,
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.field_name);
    identifierField(schema.field_name);
    validateDuplicate(schema.field_name, this._questions, this._question, 'field_name');

    requiredField(schema.field_type);
    disabled(schema.field_type);

    requiredField(schema.field_label[this._lang]);
    validateTemplateVariables(schema.field_label[this._lang], () => this.store.selected(), this._index);

    validateTemplateVariables(schema.section_header[this._lang], () => this.store.selected(), this._index);
    validateTemplateVariables(schema.field_note[this._lang], () => this.store.selected(), this._index);

    validateMinMax(schema.text_validation_min, schema.text_validation_max, 'date', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.DATE});
    validateMaxMin(schema.text_validation_max, schema.text_validation_min, 'date', {when: ({valueOf}) => valueOf(schema.field_type) === QuestionType.DATE});
  });

  constructor() {
    effect(() => {
      this.valueChange.emit(this.toAppQuestion(this.form().value()));
    });
  }

  toAppQuestion(model: QuestionnaireDateQuestionForm): AppQuestion {
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
      variable: question.variable,
      isActive: question.isActive,
      isValid: question.isValid,
      text_validation_min: question.text_validation_min,
      text_validation_max: question.text_validation_max,
    }
    return updatedQuestion;
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
