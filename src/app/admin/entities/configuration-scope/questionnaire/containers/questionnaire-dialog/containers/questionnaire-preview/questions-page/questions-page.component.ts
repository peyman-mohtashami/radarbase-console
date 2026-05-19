import {Component, inject, input, OnInit} from '@angular/core'
// import {Router} from '@angular/router'
// import {KeepAwake} from '@capacitor-community/keep-awake'
// import {Platform} from '@ionic/angular'
// import {Subscription} from 'rxjs'

// import {
//   NextButtonEventType,
//   UsageEventType
// } from '../../../../core/data-ingestion/usage/enums/events'
// import {AppProtocol} from '../../../../core/app-lifecycle/protocol/models/protocol'
// import {AppQuestion} from '../../../../core/app-lifecycle/questionnaire/models/question'
// import {AppTask} from '../../../../core/app-lifecycle/schedule/models/task'
// import {QuestionsService} from '../../services/questions.service'
// import {IntroductionComponent} from '../../components/introduction/introduction.component'
import {KeyValuePipe} from '@angular/common'
// import {QuestionComponent} from '../../components/question/question.component'
// import {ToolbarAction, ToolbarComponent} from '../../components/toolbar/toolbar.component'
// import {FinishComponent} from '../../components/finish/finish.component'
// import {addIcons} from 'ionicons'
// import {closeCircleOutline, closeOutline} from 'ionicons/icons'
// import {GroupedQuestionsComponent} from '../../components/question/grouped-question/grouped-questions.component'
// import {UsageService} from "../../../../core/data-ingestion/usage/usage.service";
// import {
//   // IonButton,
//   IonButtons,
//   IonContent,
//   IonFooter,
//   IonHeader,
//   // IonIcon,
//   IonTitle,
//   IonToolbar
// } from "@ionic/angular/standalone";
import {QuestionComponent} from '../question/question.component';
import {GroupedQuestionsComponent} from '../question/grouped-question/grouped-questions.component';
import {ToolbarAction, ToolbarComponent} from '../toolbar/toolbar.component';
import {QuestionsService} from '../services/questions.service';
// import {AppQuestion} from '../models/question';
import {AnswerWithTimeLog} from '../models/kafka';
import {NextButtonEventType} from '../models/events';
import {AppQuestion} from '../../../../../models/questionnaire';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {RadarOption} from '../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {QuestionnaireStateService} from '../../../services/questionnaire-state.service';
// import {AnswerWithTimeLog} from "../../../../core/data-ingestion/kafka/models/kafka";

@Component({
  selector: 'app-page-questions',
  templateUrl: 'questions-page.component.html',
  imports: [
    KeyValuePipe,
    // IntroductionComponent,
    QuestionComponent,
    // FinishComponent,
    ToolbarComponent,
    GroupedQuestionsComponent,
    // IonIcon,
    // IonHeader,
    // IonToolbar,
    // IonButton,
    // IonTitle,
    // IonContent,
    // IonButtons,
    // IonFooter,
    MatToolbar,
    MatIconButton,
    // MatIcon,
    // JsonPipe,
    // MatButton,
    // TranslatePipe,
  ]
})
export class QuestionsPageComponent implements OnInit {

  loading = true;
  questions = input.required<AppQuestion[]>();
  questionnaireName = input.required<string>();
  languages = input.required<RadarOption[]>();

  private questionsService = inject(QuestionsService);
  questionnaireStateService = inject(QuestionnaireStateService);

  // private usageService = inject(UsageService);
  // private platform = inject(Platform);
  // private router = inject(Router);


  // protected task = this.router.currentNavigation()?.extras.state as AppTask;
  // protected protocol!: AppProtocol;
  protected groupedQuestions: Record<string, AppQuestion[]> = {};
  protected answers: Record<string, AnswerWithTimeLog[]> = {};
  protected groupedQuestionsSize = 0;

  protected currentQuestion = {index: -1, name: ''};

  protected startTime = 0;

  protected isLeftButtonDisabled = false
  protected isRightButtonDisabled = true

  // backButtonListener: Subscription
  showProgressCount = false;

  // protected showIntroduction = false
  // protected showFinish = false


  // constructor() {
  //   addIcons({closeCircleOutline, closeOutline});
    // this.backButtonListener = this.platform.backButton.subscribe(() => {
    //   this.sendCompletionLog().then();
    //   (navigator as any)['app'].exitApp();
    // })
  // }

  async ngOnInit(): Promise<void> {
    this.showProgressCount = await this.questionsService.getIsProgressCountShown();

    await this.initQuestionnaire();
    this.updateToolbarButtons();
  }

  // noinspection JSUnusedGlobalSymbols
  // async ionViewDidEnter(): Promise<void> {
    // this.sendEvent(UsageEventType.QUESTIONNAIRE_STARTED).then();
    // this.usageService.setPage(this.constructor.name);
    // await KeepAwake.keepAwake();
  // }

  // noinspection JSUnusedGlobalSymbols
  // async ionViewDidLeave(): Promise<void> {
    // await KeepAwake.allowSleep();
    // this.sendCompletionLog().then();
    // this.backButtonListener.unsubscribe();
  // }

  private async initQuestionnaire(): Promise<void> {
    this.startTime = Date.now();
    // this.protocol = await this.questionsService.getProtocolOfTask(this.task);
    const modifiedQuestions = this.modifyQuestions(this.questions());
    this.groupedQuestions = await this.questionsService.groupQuestionsByMatrixGroup(modifiedQuestions);
    // for (const key in Object.entries(this.groupedQuestions)) {
    //   if (this.groupedQuestions.hasOwnProperty(key)) {
    //     console.log('Class: QuestionsPageComponent, Function: initQuestionnaire, Line 140 key' , key);
    //   }
    // }
    this.groupedQuestionsSize = Object.keys(this.groupedQuestions).length;
    // this.showIntroduction = this.protocol.showIntroduction !== false && this.protocol.showIntroduction !== 'never';
    // if (!this.showIntroduction) {
    //   await this.startQuestionnaire();
    // }
    this.loading = false;
    await this.startQuestionnaire();
  }

  modifyQuestions(questions: AppQuestion[]): AppQuestion[] {
    return questions.map(q => {
      return {
        field_name: q.field_name,
        field_type: q.field_type,
        field_label: q.field_label,
        section_header: q.section_header,
        required_field: q.required_field,
        select_choices_or_calculations: q.select_choices_or_calculations?.map(c => {
          return {
            code: c.code,
            label: c.label
          }
        }),
        matrix_group_name: q.matrix_group_name,
        field_annotation: q.field_annotation,
        field_note: q.field_note,
        text_validation_type_or_show_slider_number: q.text_validation_type_or_show_slider_number,
        text_validation_max: q.text_validation_max,
        text_validation_min: q.text_validation_min,
        range: q.range,
        branching_logic: q.branching_logic,
        form_name: q.field_name,
        custom_alignment: '',
        evaluated_logic: '',
        identifier: '',
        matrix_ranking: q.matrix_ranking,
        question_number: '0',
        isAutoNext: true,
        editable: false,
        calculation_fn: undefined,
        calculation_args: undefined,
      }
    });
  }

  async startQuestionnaire(): Promise<void> {
    // this.showIntroduction = false;
    // await this.questionsService.updateProtocolShowIntroduction(this.protocol);
    const groupedQuestionsKeys = Object.keys(this.groupedQuestions);
    const nextQuestionName = groupedQuestionsKeys[0];
    this.currentQuestion = {index: 0, name: nextQuestionName};
    this.answers[this.currentQuestion.name] = [];
  }

  // async handleFinish(): Promise<void> {
    // await this.router.navigateByUrl('/home');
  // }

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
    // this.isLeftButtonDisabled = this.currentQuestion.index !== 0 && this.protocol.backEnabled === false;
    this.isLeftButtonDisabled = false; //this.currentQuestion.index !== 0;
  }

  // async exitQuestionnaire(): Promise<void> {
  //   this.sendEvent(UsageEventType.QUESTIONNAIRE_CANCELLED).then();
  //   await this.router.navigateByUrl('/home');
  // }

  async navigateToFinishPage(): Promise<void> {
    // this.sendEvent(UsageEventType.QUESTIONNAIRE_FINISHED).then();
    // this.showFinish = true;
    // TODO validate answers
    // const answers: AnswerWithTimeLog[] = Object.values(this.answers).flat();
    // process -> send to kafka
    // await this.questionsService.sendToKafkaAndUpdateTaskToComplete(answers, this.task, this.protocol);
  }

  // async sendEvent(type: UsageEventType): Promise<void> {
  //   this.usageService.sendQuestionnaireEvent(type, this.task.name, this.task.timestamp);
  // }

  // async sendCompletionLog(): Promise<void> {
  //   const totalNumberOfQuestions = Object.values(this.groupedQuestions).flat().length;
  //   const attemptedAnswers = Object.keys(this.answers).filter(
  //     answerId => (this.answers[answerId].length > 0)
  //   );
  //   const completionPercentage = Math.ceil((attemptedAnswers.length * 100) / totalNumberOfQuestions);
  //   this.usageService.sendCompletionLog(this.task, completionPercentage);
  // }
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
