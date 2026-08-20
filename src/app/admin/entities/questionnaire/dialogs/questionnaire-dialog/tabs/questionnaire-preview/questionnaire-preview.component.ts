import {Component, inject, OnInit, signal, computed} from '@angular/core';
import {
  AppQuestion,
  AppQuestionConditionalLogic,
  AppQuestionnaireLanguage, QuestionType,
} from '../../../../models/questionnaire';
import {AnswerWithTimeLog} from './models/kafka';
import {ToolbarAction, ToolbarComponent} from './components/toolbar/toolbar.component';
import {JsonPipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {QuestionComponent} from './question/question.component';
import {PreviewStore} from './services/preview.store';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {evaluateConditionalLogic} from './services/utils';
import {IntroductionPageComponent} from './question/introduction-page/introduction-page.component';
import {FinishPageComponent} from './question/finish-page/finish-page.component';

@Component({
  selector: 'app-questionnaire-preview',
  templateUrl: 'questionnaire-preview.component.html',
  imports: [
    MatIconButton,
    QuestionComponent,
    ToolbarComponent,
    JsonPipe,
    IntroductionPageComponent,
    FinishPageComponent,
  ]
})
export class QuestionnairePreviewComponent implements OnInit {
  store = inject(QuestionnaireStore);
  previewStore = inject(PreviewStore);

  entity = this.store.selected()!;
  protected questionGroups = new Map<string, AppQuestion[]>();

  index = signal(-1);

  protected loading = true;

  leftButtonEnabled = signal(false);
  rightButtonEnabled = signal(false);

  progress = computed(() => {
    const index = this.index();
    return {
      enabled: (!(index < 0 || index >= this.questionGroups.size)),
      current: index,
      total: this.questionGroups.size
    };
  });

  leftButtonLabel = computed(() => {
    const index = this.index();
    return index < 0 ? 'close' : 'previous';
  });

  rightButtonLabel = computed(() => {
    const index = this.index();
    return index >= this.questionGroups.size ? 'finish' : 'next';
  });

  private readonly AUTO_NEXT_QUESTION_TYPES: string[] = [
    QuestionType.RADIO,
    QuestionType.YESNO,
    QuestionType.CALC,
    QuestionType.AUDIO,
    QuestionType.RANGE,
    QuestionType.TIMED
  ];

  async ngOnInit(): Promise<void> {
    this.previewStore.answers.set({});
    await this.initQuestionnaire();
  }

  private async initQuestionnaire(): Promise<void> {
    // this.startTime = Date.now();
    this.questionGroups = this.groupQuestionsByMatrixGroup(this.entity.questions);
    this.loading = false;
    await this.startQuestionnaire();
  }

  groupQuestionsByMatrixGroup(questions: AppQuestion[]) {
    const groupedQuestions = new Map<string, AppQuestion[]>();
    const fieldNames = new Set<string>();

    for (const [i, question] of questions.entries()) {
      const {
        field_name,
        matrix_group_name,
        section_header,
        isActive
      } = question;

      if (fieldNames.has(field_name)) {
        throw new Error(`Duplicate field_name found: ${field_name}`);
      }
      fieldNames.add(field_name);

      const key = matrix_group_name ? matrix_group_name : field_name;

      const questions = groupedQuestions.get(key) ?? [];
      if (isActive) {
        questions.push({
          ...question,
          section_header: i > 0 && !section_header && matrix_group_name === questions[i - 1]?.matrix_group_name ? questions[i - 1]?.section_header : section_header,
          visible: true
        });
        groupedQuestions.set(key, questions);
      }
    }
    return groupedQuestions;
  }

  async startQuestionnaire(): Promise<void> {
    if (this.index() !== -1 || this.entity.showIntroduction === 'no') {
      this.index.update(value => value + 1);
    } else {
      this.rightButtonEnabled.set(true);
    }
  }

  async onAnswer(answer: AnswerWithTimeLog): Promise<void> {
    const answers = this.previewStore.answers();
    answers[answer.id] = [answer];
    this.previewStore.answers.update(() => ({...answers}));

    for (const group of this.questionGroups.values()) {
      for (const question of group) {
        question.visible = this.isVisible(question);
      }
    }

    if (this.allRequiredFieldsAnswered(this.index())) {
      const group = Array.from(this.questionGroups.values())[this.index()];
      if (this.entity.autoNextEnabled && group.length === 1 && this.AUTO_NEXT_QUESTION_TYPES.includes(group[0].field_type)) {
        await this.nextQuestion(this.index());
      } else {
      this.rightButtonEnabled.set(true);
        }
    } else {
      this.rightButtonEnabled.set(false);
    }
  }

  private async nextQuestion(index: number): Promise<void> {
    const nextIndex = index + 1;

    if (nextIndex >= this.questionGroups.size) {
      this.index.update(() => nextIndex);
      return;
    }

    const group = Array.from(this.questionGroups.values())[nextIndex];
    if (group.some(q => q.visible)) {
      if (this.allRequiredFieldsAnswered(nextIndex)) {
        this.rightButtonEnabled.set(true);
      } else {
        this.rightButtonEnabled.set(false);
      }
      this.leftButtonEnabled.set(!!this.entity.previousEnabled);
      this.index.update(() => nextIndex);
    } else {
      await this.nextQuestion(nextIndex);
    }
  }

  private anyQuestionLeft(index: number): boolean {
    const groupedQuestionsKeys = [...this.questionGroups.keys()];
    const nextIndex = index + 1;
    if (nextIndex === groupedQuestionsKeys.length) {
      // this.rightButton.set({enabled: false, label: 'finish'})
      return false;
    }

    const questions = this.questionGroups.get(groupedQuestionsKeys[nextIndex]) ?? [];
    if (questions.some(q => q.visible)) {
      return true;
    } else {
      return this.anyQuestionLeft(nextIndex);
    }
  }

  private previousQuestion(index: number): void {
    const previousIndex = index - 1;

    if (previousIndex < 0) {
      this.index.update(() => -1);
      return;
    }

    const group = Array.from(this.questionGroups.values())[previousIndex];
    if (group.some(q => q.visible)) {
      this.leftButtonEnabled.set(!!this.entity.previousEnabled);
      this.rightButtonEnabled.set(true);
      this.index.update(() => previousIndex);
    } else {
      this.previousQuestion(previousIndex);
    }
  }

  private isVisible(question: AppQuestion) {
    if (!question.conditionalLogic || question.conditionalLogic.length === 0) {
      return true;
    } else {
      return this.conditionalLogicPass(question.conditionalLogic);
    }
  }

  private conditionalLogicPass(conditionalLogic: AppQuestionConditionalLogic): boolean {
    const answersArray:  AnswerWithTimeLog[] = Object.values(this.previewStore.answers()).flat();
    const _answers = answersArray.reduce((acc: Record<string, AnswerWithTimeLog>, answer) => {
      acc[answer.id] = answer;
      return acc;
    }, {});
    return evaluateConditionalLogic(_answers, conditionalLogic);
  }

  private allRequiredFieldsAnswered(index: number) {
    const group = Array.from(this.questionGroups.values())[index];
    return group.every(question => {
      if (question.visible) {
        if (question.required_field) {
          const answer = this.previewStore.answers()[question.field_name]?.[0];
          return answer && answer.value !== null;
        } else {
          return true;
        }
      } else {
        return true;
      }
    });
  }

  protected async handleToolbarEvent(event: ToolbarAction) {
    switch (event) {
      case ToolbarAction.NEXT:
      case ToolbarAction.FINISH:
        await this.nextQuestion(this.index());
        break;
      case ToolbarAction.PREVIOUS:
        this.previousQuestion(this.index());
        break;
      case ToolbarAction.CLOSE:
        break;
      default:
        break;
    }
  }

  protected switchPreviewLanguage(event: Event, language: AppQuestionnaireLanguage) {
    event.stopPropagation();
    this.previewStore.language.set(language);
  }
}



