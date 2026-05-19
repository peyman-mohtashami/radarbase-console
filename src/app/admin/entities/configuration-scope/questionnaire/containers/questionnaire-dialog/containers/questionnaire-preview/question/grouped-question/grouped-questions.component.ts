import { Component, input, OnInit, output } from '@angular/core'
//
// // import { AppQuestion } from '../../../../../core/app-lifecycle/questionnaire/models/question'
// import { ScrollableContentComponent } from '../scrolable-content/scrollable-content.component'
// // import { NextButtonEventType } from '../../../../../core/data-ingestion/usage/enums/events'
// import { QuestionHeaderComponent } from '../question-header/question-header.component'
// import { RadioInputComponent } from '../input-field/radio-input/radio-input.component'
// import { MatrixRadioInputComponent } from '../input-field/matrix-radio-input/matrix-radio-input.component'
// import { TextInputComponent } from '../input-field/text-input/text-input.component'
// import { CheckboxInputComponent } from '../input-field/checkbox-input/checkbox-input.component'
// import { DateInputComponent } from '../input-field/date-input/date-input.component'
// import { RangeInfoInputComponent } from '../input-field/range-info-input/range-info-input.component'
// import { RangeInputComponent } from '../input-field/range-input/range-input.component'
// import { SliderInputComponent } from '../input-field/slider-input/slider-input.component'
// import { TimeInputComponent } from '../input-field/time-input/time-input.component'
// import { YesnoInputComponent } from '../input-field/yesno-input/yesno-input.component'
// import {AppQuestion} from '../../models/question';
import {AnswerWithTimeLog} from '../../models/kafka';
import {NextButtonEventType} from '../../models/events';
import {evaluateConditionalLogic} from '../../services/parsers';
import {AppQuestion} from '../../../../../../models/questionnaire';
// import {evaluateConditionalLogic} from '../../../services/parsers'
// import {AnswerWithTimeLog} from "../../../../../core/data-ingestion/kafka/models/kafka";

@Component({
  selector: 'app-grouped-questions',
  templateUrl: 'grouped-questions.component.html',
  imports: [
    // ScrollableContentComponent,
    // QuestionHeaderComponent,
    // RadioInputComponent,
    // MatrixRadioInputComponent,
    // TextInputComponent,
    // CheckboxInputComponent,
    // DateInputComponent,
    // RangeInfoInputComponent,
    // RangeInputComponent,
    // SliderInputComponent,
    // TimeInputComponent,
    // YesnoInputComponent,
  ],
})
export class GroupedQuestionsComponent implements OnInit {

  groupName = input.required<string>()
  questions = input.required<AppQuestion[]>()
  answers = input<Record<string, AnswerWithTimeLog[]>>();

  answerEvent = output<Record<string, AnswerWithTimeLog>>()
  nextActionEvent = output<NextButtonEventType>()

  groupAnswers: Record<string, AnswerWithTimeLog> = {};

  questionsList: (AppQuestion & { showQuestion: boolean })[] = [];
  private startTime = Date.now();
  // protected isHealthKitQuestionsList = false;


  ngOnInit(): void {
    this.startTime = Date.now();

    const groupAnswersArray = this.answers()?.[this.groupName()] ?? [];
    this.groupAnswers = groupAnswersArray.reduce((acc: Record<string, AnswerWithTimeLog>, answer) => {
      acc[answer.id] = answer;
      return acc;
    }, {});

    this.questionsList = this.questions().map(question => ({
      ...question,
      showQuestion: this.shouldShowQuestion(question)
    }));

    // this.isHealthKitQuestionsList = this.questions().some(question => question.field_type === 'healthkit');

    // this.isHealthKitQuestionsList = this.questionsList[0].form_name === 'healthkit';

    if (this.allRequiredQuestionsAreAnswered()) {
      this.nextActionEvent.emit(NextButtonEventType.ENABLE)
    }
  }

  /**
   * Determines if a question should be shown based on its branching logic.
   */
  shouldShowQuestion(question: AppQuestion): boolean {
    if (!question.branching_logic) {
      return true;
    } else {
      const branchingLogic = question.branching_logic;
      return this.branchingLogicPass(branchingLogic);
    }
  }

  branchingLogicPass(branchingLogic: string) {
    const answersArray: AnswerWithTimeLog[] = Object.values(this.answers() ?? {}).flat();
    const answers = answersArray.reduce((acc: Record<string, AnswerWithTimeLog>, answer) => {
      acc[answer.id] = answer;
      return acc;
    }, {});
    return evaluateConditionalLogic(answers, branchingLogic);
  }

  /**
   * Handles input changes from child components.
   * Updates answers, reevaluates question visibility, and updates navigation state.
   */
  onInputChange(index: number, question: AppQuestion, value: string | number | null): void {
    this.saveAnswer(question, value);

    this.updateSubsequentQuestionsVisibility(index + 1);

    setTimeout(() => {
      const eventType = this.allRequiredQuestionsAreAnswered()
        ? NextButtonEventType.ENABLE
        : NextButtonEventType.DISABLE;
      this.nextActionEvent.emit(eventType);
    }, 300);
  }

  // protected onHealthInputChange(event: number) {
  //   this.questions().forEach((question, index) => {
  //     this.groupAnswers[question.field_name] = {
  //       id: question.field_name,
  //       value: String(event),
  //       type: question.field_type,
  //       startTime: this.startTime,
  //       endTime: Date.now()
  //     };
  //   })
  //
  //   this.answerEvent.emit(this.groupAnswers);
  //   setTimeout(() => {
  //     const eventType = this.allRequiredQuestionsAreAnswered()
  //       ? NextButtonEventType.ENABLE
  //       : NextButtonEventType.DISABLE;
  //     this.nextActionEvent.emit(eventType);
  //   }, 300);
  // }


  /**
   * Saves the user's answer with timing metadata.
   */
  private saveAnswer(question: AppQuestion, value: string | number | null): void {
    this.groupAnswers[question.field_name] = {
      id: question.field_name,
      value: String(value),
      type: question.field_type,
      startTime: this.startTime,
      endTime: Date.now()
    };
    this.answerEvent.emit(this.groupAnswers);
  }

  /**
   * Recalculates visibility for questions starting at the specified index.
   */
  private updateSubsequentQuestionsVisibility(startIndex: number): void {
    for (let i = startIndex; i < this.questionsList.length; i++) {
      const question = this.questionsList[i];
      question.showQuestion = this.shouldShowQuestion(question);
    }
  }

  /**
   * Checks if all required and visible questions have been answered.
   */
  private allRequiredQuestionsAreAnswered(): boolean {
    return this.questionsList.every(question => {
      const isRequired = question.required_field !== 'false';
      const hasAnswer = this.answers()?.[question.field_name]?.[0]?.value;
      if (!isRequired) return true;
      if (!question.showQuestion) return true;
      return !(!hasAnswer || hasAnswer === "null" || hasAnswer === "undefined");
    });
  }


}
