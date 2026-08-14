import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AppQuestion, AppQuestionnaireLanguage, DEFAULT_LANGUAGE} from '../../../../models/questionnaire';
import {QuestionsService} from './services/questions.service';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {AnswerWithTimeLog} from './models/kafka';
import {ToolbarAction, ToolbarComponent} from './toolbar/toolbar.component';
import {JsonPipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {QuestionComponent} from './question/question.component';
import {PreviewStateService} from './services/preview-state.service';
import {evaluateConditionalLogic} from './services/parsers';
import {QuestionType} from './models/question';
import {parsePlaceholder, Placeholder} from './pipes/replace-placeholders.pipe';
import {debounceTime} from 'rxjs/operators';
import {
  PreviewPlaceholderFormComponent
} from './components/preview-placeholder-form/preview-placeholder-form.component';

type PlaceholderFormGroup = FormGroup<{
  questionnaireId: FormControl<string>;
  questionId: FormControl<string>;
  operator: FormControl<string>;
  startTimestamp: FormControl<string>;
  endTimestamp: FormControl<string>;
  value: FormControl<string>;
}>;

@Component({
  selector: 'app-questionnaire-preview',
  templateUrl: 'questionnaire-preview.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ReactiveFormsModule,
    MatIconButton,
    QuestionComponent,
    ToolbarComponent,
    JsonPipe,
    // MatFormField,
    // MatInput,
    PreviewPlaceholderFormComponent
  ]
})
export class QuestionnairePreviewComponent implements OnInit {
  private questionsService = inject(QuestionsService);
  dialogState = inject(QuestionnaireDialogStateService);
  previewState = inject(PreviewStateService);

  private fb = inject(FormBuilder);

  entity = this.dialogState.questionnaire;
  selectedLanguage = (this.entity()?.defaultLanguage ?? [DEFAULT_LANGUAGE]) as AppQuestionnaireLanguage;

  protected loading = true;

  protected groupedQuestions = new Map<string, AppQuestion[]>();
  protected currentQuestionsGroup: {index: number, key: string; questions: AppQuestion[]} = {index: -1, key: '', questions: []};

  leftButtonLabel = signal('close');
  rightButtonLabel = signal('next');
  leftButtonEnabled = signal(false);
  rightButtonEnabled = signal(false);

  protected progress = signal({enabled: false, current: 0, total: 1});

  placeholders: Placeholder[] = [];

  placeholderForm = this.fb.group({
    placeholders: this.fb.array<PlaceholderFormGroup>([]),
  });

  get placeholderControls(): PlaceholderFormGroup[] {
    return this.placeholderForm.controls.placeholders.controls;
  }

  private readonly AUTO_NEXT_QUESTION_TYPES: string[] = [
    QuestionType.RADIO,
    QuestionType.YESNO,
    QuestionType.CALCULATION,
    QuestionType.AUDIO,
    QuestionType.RANGE,
    QuestionType.TIMED
  ];



  async ngOnInit(): Promise<void> {
    this.previewState.answers.set({});
    await this.initQuestionnaire();
  }

  private async initQuestionnaire(): Promise<void> {
    // this.startTime = Date.now();
    const modifiedQuestions = this.modifyQuestions(this.entity()!.questions);
    this.groupedQuestions = this.questionsService.groupQuestionsByMatrixGroup(modifiedQuestions);
    this.progress.set({enabled: true, current: 0, total: this.groupedQuestions.size});

    this.placeholders = this.findPlaceholders();
    console.log('Class: QuestionnairePreviewComponent, Function: initQuestionnaire, Line 67 placeholders' , this.placeholders);
    this.buildPlaceholderForm(this.placeholders);

    this.placeholderForm.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(change => {
      console.log('Class: QuestionnairePreviewComponent, Function: , Line 98 change' , change);
      this.previewState.placeholderAnswers.set(change);
    });

    this.loading = false;
    await this.startQuestionnaire();
  }

  private buildPlaceholderForm(placeholders: Placeholder[]): void {
    const placeholderArray = this.placeholderForm.controls.placeholders;

    placeholderArray.clear();

    placeholders.forEach((placeholder) => {
      placeholderArray.push(this.fb.nonNullable.group({
        questionnaireId: placeholder.questionnaireId ?? '',
        questionId: placeholder.questionId,
        operator: placeholder.operator ?? 'latest',
        startTimestamp: placeholder.startTimestamp ?? '',
        endTimestamp: placeholder.endTimestamp ?? '',
        value: '',
      }));
    });
  }

  private modifyQuestions(questions: AppQuestion[]): AppQuestion[] {
    return [...questions];
  }

  async startQuestionnaire(): Promise<void> {
    const groupedQuestionsKeys = [...this.groupedQuestions.keys()];
    this.currentQuestionsGroup = {index: 0, key: groupedQuestionsKeys[0], questions: this.groupedQuestions.get(groupedQuestionsKeys[0]) ?? []};
  }

  async onAnswer(answer: AnswerWithTimeLog): Promise<void> {
    const answers = this.previewState.answers();
    answers[answer.id] = [answer];
    this.previewState.answers.set({...answers});

    for (const questions of this.groupedQuestions.values()) {
      for (const q of questions) {
        q.visible = this.isVisible(q);
      }
    }

    if (!this.anyQuestionLeft(this.currentQuestionsGroup.index)) {
      this.progress.set({enabled: true, current: this.currentQuestionsGroup.index, total: this.currentQuestionsGroup.index + 1});
      this.rightButtonLabel.set('finish');
    } else {
      this.progress.set({enabled: true, current: this.currentQuestionsGroup.index, total: this.groupedQuestions.size});
      this.rightButtonLabel.set('next');
    }

    if (this.allRequiredFieldsAnswered()) {
      const questions = this.currentQuestionsGroup.questions;
      // if (questions.length === 1 && this.AUTO_NEXT_QUESTION_TYPES.includes(questions[0].field_type)) {
      //   await this.nextQuestion(this.currentQuestionsGroup.index)
      // } else {
      this.rightButtonEnabled.set(this.rightButtonLabel() !== 'finish');
    } else {
      this.rightButtonEnabled.set(false);
    }
  }

  private async nextQuestion(index: number): Promise<void> {
    const groupedQuestionsKeys = [...this.groupedQuestions.keys()];
    const nextIndex = index + 1;
    if (nextIndex === groupedQuestionsKeys.length) {
      return;
    }

    const questions = this.groupedQuestions.get(groupedQuestionsKeys[nextIndex]) ?? [];
    if (questions.some(q => q.visible)) {
      this.currentQuestionsGroup = {index: nextIndex, key: groupedQuestionsKeys[nextIndex], questions: this.groupedQuestions.get(groupedQuestionsKeys[nextIndex]) ?? []};

      this.leftButtonLabel.set('previous');
      this.leftButtonEnabled.set(true);

      if (!this.anyQuestionLeft(nextIndex)) {
        this.progress.set({enabled: true, current: this.currentQuestionsGroup.index, total: this.currentQuestionsGroup.index + 1});
        this.rightButtonLabel.set('finish');
      } else {
        this.progress.set({enabled: true, current: this.currentQuestionsGroup.index, total: this.groupedQuestions.size});
        this.rightButtonLabel.set('next');
      }
      if (this.allRequiredFieldsAnswered()) {
        this.rightButtonEnabled.set(this.rightButtonLabel() !== 'finish');
      } else {
        this.rightButtonEnabled.set(false);
      }

      this.progress.set({enabled: true, current: nextIndex, total: this.groupedQuestions.size});

    } else {
      await this.nextQuestion(nextIndex);
    }
  }

  private anyQuestionLeft(index: number): boolean {
    const groupedQuestionsKeys = [...this.groupedQuestions.keys()];
    const nextIndex = index + 1;
    if (nextIndex === groupedQuestionsKeys.length) {
      // this.rightButton.set({enabled: false, label: 'finish'})
      return false;
    }

    const questions = this.groupedQuestions.get(groupedQuestionsKeys[nextIndex]) ?? [];
    if (questions.some(q => q.visible)) {
      return true;
    } else {
      return this.anyQuestionLeft(nextIndex);
    }
  }

  private previousQuestion(index: number): void {
    if (index === 0) {
      return;
    }

    const groupedQuestionsKeys = [...this.groupedQuestions.keys()];
    const previousIndex = index - 1;
    const questions = this.groupedQuestions.get(groupedQuestionsKeys[previousIndex]) ?? [];
    if (questions.some(q => q.visible)) {
      this.currentQuestionsGroup = {index: previousIndex, key: groupedQuestionsKeys[previousIndex], questions: this.groupedQuestions.get(groupedQuestionsKeys[previousIndex]) ?? []};

      if (previousIndex === 0) {
        this.leftButtonLabel.set('close');
        this.leftButtonEnabled.set(false);
      } else {
        this.leftButtonLabel.set('previous');
        this.leftButtonEnabled.set(true);
      }

      this.rightButtonLabel.set('next');
      this.rightButtonEnabled.set(true);

      this.progress.set({enabled: true, current: previousIndex, total: this.groupedQuestions.size});

    } else {
      this.previousQuestion(previousIndex);
    }
  }

  private isVisible(question: AppQuestion) {
    if (!question.branching_logic) {
      return true;
    } else {
      const branchingLogic = question.branching_logic;
      return this.branchingLogicPass(branchingLogic);
    }
  }

  private branchingLogicPass(branchingLogic: string): boolean {
    const answersArray:  AnswerWithTimeLog[] = Object.values(this.previewState.answers()).flat();
    const _answers = answersArray.reduce((acc: Record<string, AnswerWithTimeLog>, answer) => {
      acc[answer.id] = answer;
      return acc;
    }, {});
    return evaluateConditionalLogic(_answers, branchingLogic);
  }

  private allRequiredFieldsAnswered() {
    return this.currentQuestionsGroup.questions.every(q => {
      if (q.visible) {
        if (q.required_field) {
          const answer = this.previewState.answers()[q.field_name]?.[0];
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
        await this.nextQuestion(this.currentQuestionsGroup.index);
        break;
      case ToolbarAction.PREVIOUS:
        this.previousQuestion(this.currentQuestionsGroup.index);
        break;
      case ToolbarAction.CLOSE:
        break;
      default:
        break;
    }
  }

  protected switchPreviewLanguage(event: Event, language: AppQuestionnaireLanguage) {
    event.stopPropagation();
    this.selectedLanguage = language;
    this.previewState.language.set(language);
  }

  findPlaceholders() {
    const result: string[] = [];

    this.entity()!.questions.forEach((question) => {
      result.push(...extractPlaceholders(question.field_label[this.selectedLanguage.code]));
      result.push(...extractPlaceholders(question.section_header?.[this.selectedLanguage.code]));
      result.push(...extractPlaceholders(question.field_note?.[this.selectedLanguage.code]));
      question.select_choices_or_calculations?.forEach((choice) => {
        result.push(...extractPlaceholders(choice.label[this.selectedLanguage.code]));
      });
    });

    return result.map((p) => {
      const placeholder = parsePlaceholder(p);
      if (!placeholder) {
        // Invalid placeholder, leave unchanged
        return null;
      }

      const {
        questionnaireId,
        questionId,
        operator,
        startTimestamp,
        endTimestamp,
      } = placeholder;

      if (questionnaireId) {
        return placeholder;
      }
      return null;
    }).filter((p) => p !== null);
  }
}

function extractPlaceholders(str?: string) {
  const matches = str?.match(/\[([^[\]]+)]/g);
  if (!matches) {
    return [];
  }
  return matches.map(match => match.slice(1, -1));
}
