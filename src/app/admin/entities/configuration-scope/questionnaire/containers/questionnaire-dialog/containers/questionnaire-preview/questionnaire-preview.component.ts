import {Component, inject, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AppQuestion, DEFAULT_LANGUAGE} from '../../../../models/questionnaire';
import {RadarOption} from '../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {QuestionsService} from './services/questions.service';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {AnswerWithTimeLog} from './models/kafka';
import {NextButtonEventType} from './models/events';
import {ToolbarAction, ToolbarComponent} from './toolbar/toolbar.component';
import {GroupedQuestionsComponent} from './question/grouped-question/grouped-questions.component';
import {JsonPipe, KeyValuePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {QuestionComponent} from './question/question.component';

@Component({
  selector: 'app-questionnaire-preview',
  templateUrl: 'questionnaire-preview.component.html',
  imports: [
    ReactiveFormsModule,
    GroupedQuestionsComponent,
    KeyValuePipe,
    MatIconButton,
    QuestionComponent,
    ToolbarComponent,
    JsonPipe
  ]
})
export class QuestionnairePreviewComponent implements OnInit {
  private questionsService = inject(QuestionsService);
  dialogState = inject(QuestionnaireDialogStateService);

  entity = this.dialogState.selectedQuestionnaire;
  selectedLanguage = (this.entity()?.defaultLanguage ?? [DEFAULT_LANGUAGE]) as RadarOption;

  loading = true;

  protected groupedQuestions: Record<string, AppQuestion[]> = {};
  protected answers: Record<string, AnswerWithTimeLog[]> = {};
  protected groupedQuestionsSize = 0;

  protected currentQuestion = {index: -1, name: ''};

  protected startTime = 0;

  protected isLeftButtonDisabled = false
  protected isRightButtonDisabled = true

  showProgressCount = false;

  async ngOnInit(): Promise<void> {

    this.showProgressCount = await this.questionsService.getIsProgressCountShown();
    await this.initQuestionnaire();
    this.updateToolbarButtons();
  }

  private async initQuestionnaire(): Promise<void> {
    this.startTime = Date.now();
    const modifiedQuestions = this.modifyQuestions(this.entity()!.questions);
    this.groupedQuestions = await this.questionsService.groupQuestionsByMatrixGroup(modifiedQuestions);
    this.groupedQuestionsSize = Object.keys(this.groupedQuestions).length;
    this.loading = false;
    await this.startQuestionnaire();
  }

  modifyQuestions(questions: AppQuestion[]): AppQuestion[] {
    return [...questions];
  }

  async startQuestionnaire(): Promise<void> {
    const groupedQuestionsKeys = Object.keys(this.groupedQuestions);
    const nextQuestionName = groupedQuestionsKeys[0];
    this.currentQuestion = {index: 0, name: nextQuestionName};
    this.answers[this.currentQuestion.name] = [];
  }

  onAnswer(answer: AnswerWithTimeLog): void {
    this.answers[this.currentQuestion.name] = [answer];
  }

  onGroupAnswer(event: Record<string, AnswerWithTimeLog>) {
    Object.entries(event).forEach(([key, value]) => {
      this.answers[key] = [value];
    })
  }

  nextActionMap = {
    [NextButtonEventType.AUTO]: () => this.nextQuestion(),
    [NextButtonEventType.ENABLE]: () => this.updateToolbarButtons('ENABLE'),
    [NextButtonEventType.DISABLE]: () => (this.isRightButtonDisabled = true)
  }

  nextAction(event: NextButtonEventType): void {
    this.nextActionMap[event]();
  }

  private async nextQuestion(): Promise<void> {
    const groupedQuestionsKeys = Object.keys(this.groupedQuestions);

    if (this.currentQuestion.index === groupedQuestionsKeys.length - 1) {
      await this.navigateToFinishPage();
      return;
    }

    const nextKeyIndex = this.currentQuestion.index + 1;
    // check if the next question should be shown or hide based on branching_logic
    const nextKeyName = groupedQuestionsKeys[nextKeyIndex];
    this.currentQuestion = {index: nextKeyIndex, name: nextKeyName};
    if (this.questionsService.shouldShowQuestion(this.groupedQuestions[nextKeyName], this.answers)) {
      this.answers[this.currentQuestion.name] = this.answers[this.currentQuestion.name] ?? [];
      this.updateToolbarButtons();
    } else {
      await this.nextQuestion();
    }
  }

  private previousQuestion(): void {
    if (this.currentQuestion.index === 0) {
      return;
    }
    const previousKeyIndex = this.currentQuestion.index - 1;
    const previousKeyName = Object.keys(this.groupedQuestions)[previousKeyIndex];
    this.currentQuestion = {index: previousKeyIndex, name: previousKeyName};
    if (this.questionsService.shouldShowQuestion(this.groupedQuestions[previousKeyName], this.answers)) {
      this.updateToolbarButtons('ENABLE');
    } else {
      this.previousQuestion();
    }
  }

  private updateToolbarButtons(action = 'DISABLE'): void {
    this.isRightButtonDisabled = action !== 'ENABLE'
    this.isLeftButtonDisabled = false;
  }

  async navigateToFinishPage(): Promise<void> {
    // this.sendEvent(UsageEventType.QUESTIONNAIRE_FINISHED).then();
    // this.showFinish = true;
    // TODO validate answers
    // const answers: AnswerWithTimeLog[] = Object.values(this.answers).flat();
    // process -> send to kafka
    // await this.questionsService.sendToKafkaAndUpdateTaskToComplete(answers, this.task, this.protocol);
  }

  originalOrder = () => 0;

  protected async handleToolbarEvent(event: ToolbarAction) {
    switch (event) {
      case ToolbarAction.NEXT:
      case ToolbarAction.FINISH:
        await this.nextQuestion();
        break;
      case ToolbarAction.PREVIOUS:
        this.previousQuestion();
        break;
      // case ToolbarAction.FINISH:
      //   console.log('Class: QuestionsPageComponent, Function: handleToolbarEvent, Line 233 ' , );
      //   await this.handleFinish();
      //   break;
      case ToolbarAction.CLOSE:
        // await this.exitQuestionnaire();
        break;
      default:
        break;
    }
  }
}
