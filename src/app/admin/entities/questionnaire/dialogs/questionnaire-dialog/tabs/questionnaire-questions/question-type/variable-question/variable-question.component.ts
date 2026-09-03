import {Component, effect, inject, input, output, signal,} from '@angular/core';
import {
  AppQuestion,
  AppQuestionConditionalLogic,
  AppQuestionnaire, AppQuestionnaireLanguage,
} from '../../../../../../models/questionnaire';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError, MatFormField, MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  identifierField,
  requiredField,
  validateDuplicate,
} from '../../../../../../../../../shared/utils/signal-form-validators';
import {disabled, form, FormField} from '@angular/forms/signals';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionComponent} from '../../../questionnaire-preview/components/question/question.component';
import {ToolbarComponent} from '../../../questionnaire-preview/components/toolbar/toolbar.component';
import {QuestionsStore} from '../../services/questions.store';
import {PreviewStore} from '../../../questionnaire-preview/services/preview.store';
import {AnswerWithTimeLog} from '../../../questionnaire-preview/models/kafka';
import {QUESTION_TYPES} from '../../../../services/utils';

export interface QuestionnaireVariableQuestionForm extends Record<string, unknown> {
  id: string;
  field_name: string;
  field_type: string;
  variable: {
    type: string;
    reserved_var: string;
    topic: string;
    topic_var: string;
    questionnaireId: string;
    questionnaire_question: string;
    start: string;
    end: string;
    method: string;
  };
  isActive: boolean;
}

@Component({
  selector: 'app-variable-question',
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
    MatTooltip,
    QuestionComponent,
    ToolbarComponent,
  ],
  templateUrl: './variable-question.component.html'
})
export class VariableQuestionComponent {
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

  protected model = signal<QuestionnaireVariableQuestionForm>({ //this.dialogData.restoredModel ??{
    ...this._question,
    id: this._question.id ?? crypto.randomUUID(),
    field_name: this._question.field_name ?? '',
    field_type: this._question.field_type ?? '',
    variable: {
      type: this._question.variable?.type ?? '',
      reserved_var: this._question.variable?.reserved_var ?? '',
      topic: this._question.variable?.topic ?? '',
      topic_var: this._question.variable?.topic_var ?? '',
      questionnaireId: this._question.variable?.questionnaireId ?? '',
      questionnaire_question: this._question.variable?.questionnaire_question ?? '',
      start: this._question.variable?.start ?? '',
      end: this._question.variable?.end ?? '',
      method: this._question.variable?.method ?? ''
    },
    isActive: this._question.isActive ?? false,
  });

  protected form = form(this.model, (schema) => {
    requiredField(schema.field_name);
    identifierField(schema.field_name);
    validateDuplicate(schema.field_name, this._questions, this._question, 'field_name');

    requiredField(schema.field_type);
    disabled(schema.field_type);
  });

  protected VARIABLE_TYPES = [
    {value: 'reserved_variables', label: 'Reserved Variables'},
    {value: 'topic', label: 'Topic'},
    {value: 'questionnaire', label: 'Questionnaire'},
  ];
  protected RESERVED_VARS = [
    {value: 'subjectId', label: 'Subject ID'},
    {value: 'enrolmentDate', label: 'Enrolment Date'},
  ];
  protected METHODS = [
    {value: 'average', label: 'Average'},
    {value: 'min', label: 'Min'},
    {value: 'max', label: 'Max'},
  ];

  constructor() {
    effect(() => {
      this.valueChange.emit(this.toAppQuestion(this.form().value()));
    });
  }

  toAppQuestion(model: QuestionnaireVariableQuestionForm): AppQuestion {
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
      field_label: {},
      required_field: true,
      conditionalLogic: question.conditionalLogic?.length ? question.conditionalLogic : undefined,
      branching_logic: question.branching_logic || undefined,
      variable: question.variable,
      isActive: question.isActive,
      isValid: question.isValid,
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
