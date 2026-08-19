import {Component, inject, OnInit, signal, ChangeDetectionStrategy, computed} from '@angular/core';
import {
  AppQuestion,
  AppQuestionConditionalLogic,
  AppQuestionnaireLanguage,
} from '../../../../models/questionnaire';
import {AnswerWithTimeLog} from './models/kafka';
import {ToolbarAction, ToolbarComponent} from './components/toolbar/toolbar.component';
import {JsonPipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {QuestionComponent} from './question/question.component';
import {PreviewStore} from './services/preview.store';
import {QuestionType} from './models/question';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {evaluateConditionalLogic} from './services/utils';

// export interface PlaceHoldersForm {
//   id: string;
//   name: string;
//   type: "question";
//   questionId: string;
//   questionnaireId: string;
//   function: string;
//   start: string;
//   end: string;
// }

// type PlaceholderFormGroup = FormGroup<{
//   questionnaireId: FormControl<string>;
//   questionId: FormControl<string>;
//   operator: FormControl<string>;
//   startTimestamp: FormControl<string>;
//   endTimestamp: FormControl<string>;
//   value: FormControl<string>;
// }>;

@Component({
  selector: 'app-questionnaire-preview',
  templateUrl: 'questionnaire-preview.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatIconButton,
    QuestionComponent,
    ToolbarComponent,
    JsonPipe,
    // KeyValuePipe,
    // PreviewPlaceholderFormComponent
  ]
})
export class QuestionnairePreviewComponent implements OnInit {
  store = inject(QuestionnaireStore);
  previewStore = inject(PreviewStore);

  // private fb = inject(FormBuilder);

  entity = this.store.selected()!;
  protected questionGroups = new Map<string, AppQuestion[]>();

  index = signal(-1);
  // selectedLanguage = (this.entity()?.defaultLanguage ?? [DEFAULT_LANGUAGE]) as AppQuestionnaireLanguage;

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

  // placeHoldersModel = signal<PlaceHoldersForm>({
  //   id: '',
  //   name: '',
  //   type: 'question',
  //   questionId: '',
  //   questionnaireId: '',
  //   function: '',
  //   start: '',
  //   end: '',
  // });
  //
  // placeHolderForm = form(this.placeHoldersModel);
  //
  // placeholders: Placeholder[] = [];

  // placeholderForm = this.fb.group({
  //   placeholders: this.fb.array<PlaceholderFormGroup>([]),
  // });

  // get placeholderControls(): PlaceholderFormGroup[] {
  //   return this.placeholderForm.controls.placeholders.controls;
  // }

  private readonly AUTO_NEXT_QUESTION_TYPES: string[] = [
    QuestionType.RADIO,
    QuestionType.YESNO,
    QuestionType.CALCULATION,
    QuestionType.AUDIO,
    QuestionType.RANGE,
    QuestionType.TIMED
  ];

  autoNextEnabled = false;
  editEnabled = true;
  previousEnabled = true;

  async ngOnInit(): Promise<void> {
    this.previewStore.answers.set({});
    await this.initQuestionnaire();
  }

  private async initQuestionnaire(): Promise<void> {
    // this.startTime = Date.now();
    // const modifiedQuestions = this.modifyQuestions(this.entity.questions);
    this.questionGroups = this.groupQuestionsByMatrixGroup(this.entity.questions);

    // this.buildPlaceholderForm(this.findPlaceholders());

    // this.placeholderForm.valueChanges.pipe(
    //   debounceTime(500),
    // ).subscribe(change => {
    //   this.previewStore.placeholderAnswers.set(change);
    // });

    this.loading = false;
    await this.startQuestionnaire();
  }

  groupQuestionsByMatrixGroup(questions: AppQuestion[]) {
    // const autoNextQuestionnaireTypes = await this.getAutoNextQuestionnaireTypes();

    const groupedQuestions = new Map<string, AppQuestion[]>();
    const fieldNames = new Set<string>();

    for (const [i, question] of questions.entries()) {
      const {
        field_name,
        field_type,
        text_validation_type_or_show_slider_number,
        matrix_group_name,
        section_header,
      } = question;

      if (fieldNames.has(field_name)) {
        throw new Error(`Duplicate field_name found: ${field_name}`);
      }
      fieldNames.add(field_name);

      if (field_type === QuestionType.TEXT) {
        question.field_type = this.getModifiedFieldType(text_validation_type_or_show_slider_number);
      }

      const key = matrix_group_name ? matrix_group_name : field_name;

      // if (!groupedQuestions.get(key)) {
      //   groupedQuestions.set(key, []);
      // }

      const questions = groupedQuestions.get(key) ?? [];
      questions.push({
        ...question,
        section_header: i > 0 && !section_header && matrix_group_name === questions[i - 1]?.matrix_group_name ? questions[i - 1]?.section_header : section_header,
        visible: true
        // isAutoNext: autoNextQuestionnaireTypes.has(field_type),
      });
      groupedQuestions.set(key, questions);
    }




    // Convert Healthkit questionnaire to Health questionnaire
    // for (const key in groupedQuestions) {
    //   const isHealthkitGroup = groupedQuestions[key].some(question => question.field_type === 'healthkit');
    //   if (isHealthkitGroup) {
    //     const firstQuestion = groupedQuestions[key][0];
    //     const healthQuestion: AppQuestion = {
    //       field_name: firstQuestion.field_name,
    //       field_type: 'health',
    //       field_label: firstQuestion.section_header ?? {},
    //       field_note: firstQuestion.field_note,
    //       select_choices_or_calculations: groupedQuestions[key].map(q => ({
    //         code: q.field_name,
    //         label: q.field_label || ""
    //       })),
    //     }
    //     groupedQuestions[key] = [healthQuestion];
    //   }
    // }
    console.log('Class: QuestionsService, Function: groupQuestionsByMatrixGroup, Line 87 groupedQuestions' , groupedQuestions);
    return groupedQuestions;
  }

  private getModifiedFieldType(textFieldType?: string) {
    if (textFieldType?.includes('date')) {
      return QuestionType.DATE;
    }
    if (textFieldType?.includes('time')) {
      return QuestionType.TIME;
    }
    if (textFieldType?.includes('duration')) {
      return QuestionType.DURATION;
    }
    return QuestionType.TEXT;
  }

  // private buildPlaceholderForm(placeholders: Placeholder[]): void {
  //   const placeholderArray = this.placeholderForm.controls.placeholders;
  //
  //   placeholderArray.clear();
  //
  //   placeholders.forEach((placeholder) => {
  //     placeholderArray.push(this.fb.nonNullable.group({
  //       questionnaireId: placeholder.questionnaireId ?? '',
  //       questionId: placeholder.questionId,
  //       operator: placeholder.operator ?? 'latest',
  //       startTimestamp: placeholder.startTimestamp ?? '',
  //       endTimestamp: placeholder.endTimestamp ?? '',
  //       value: '',
  //     }));
  //   });
  // }

  // private modifyQuestions(questions: AppQuestion[]): AppQuestion[] {
  //   return [...questions];
  // }

  async startQuestionnaire(): Promise<void> {
    if (this.index() !== -1 || this.entity.showIntroduction === 'no') {
      this.index.update(value => value + 1);
    } else {
      this.rightButtonEnabled.set(true);
      // this.progress.set({enabled: true, current: this.index(), total: this.questionGroups.size});
      // this.rightButtonLabel.set('finish');
    }
    // if index === -1 && showIntro && intro => nothing
    // else index++

    // const groupedQuestionsKeys = [...this.groupedQuestions.keys()];
    // this.currentQuestionsGroup = {index: 0, key: groupedQuestionsKeys[0], questions: this.groupedQuestions.get(groupedQuestionsKeys[0]) ?? []};
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

    // if (!this.anyQuestionLeft(this.index())) {
      // this.progress.set({enabled: true, current: this.index(), total: this.questionGroups.size});
      // this.rightButtonLabel.set('finish');
    // } else {
      // this.progress.set({enabled: true, current: this.index(), total: this.questionGroups.size});
      // this.rightButtonLabel.set('next');
    // }

    if (this.allRequiredFieldsAnswered(this.index())) {
      const group = Array.from(this.questionGroups.values())[this.index()];
      if (this.autoNextEnabled && group.length === 1 && this.AUTO_NEXT_QUESTION_TYPES.includes(group[0].field_type)) {
        await this.nextQuestion(this.index());
      } else {
      this.rightButtonEnabled.set(true);//this.rightButtonLabel() !== 'finish');
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

      // this.leftButtonLabel.set('previous');
      // this.leftButtonEnabled.set(true);

      // if (!this.anyQuestionLeft(nextIndex)) {
        // this.progress.set({enabled: true, current: this.index(), total: this.questionGroups.size});
        // this.progress.set({enabled: true, current: this.currentQuestionsGroup.index, total: this.currentQuestionsGroup.index + 1});
        // this.rightButtonLabel.set('finish');
      // } else {
        // this.progress.set({enabled: true, current: this.index(), total: this.questionGroups.size});
        // this.progress.set({enabled: true, current: this.currentQuestionsGroup.index, total: this.questionGroups.size});
        // this.rightButtonLabel.set('next');
      // }
      // if (this.index() === -1) {
      //   this.index.update(() => nextIndex);
      // }
      if (this.allRequiredFieldsAnswered(nextIndex)) {
        this.rightButtonEnabled.set(true);
      } else {
        this.rightButtonEnabled.set(false);
      }
      this.leftButtonEnabled.set(this.previousEnabled);
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
      this.leftButtonEnabled.set(this.previousEnabled);
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

  // findPlaceholders() {
  //   const result: string[] = [];
  //
  //   this.entity.questions.forEach((question) => {
  //     result.push(...extractPlaceholders(question.field_label[this.previewStore.language().code]));
  //     result.push(...extractPlaceholders(question.section_header?.[this.previewStore.language().code]));
  //     result.push(...extractPlaceholders(question.field_note?.[this.previewStore.language().code]));
  //     question.select_choices_or_calculations?.forEach((choice) => {
  //       result.push(...extractPlaceholders(choice.label[this.previewStore.language().code]));
  //     });
  //   });
  //
  //   return result.map((p) => {
  //     const placeholder = parsePlaceholder(p);
  //     if (!placeholder) {
  //       // Invalid placeholder, leave unchanged
  //       return null;
  //     }
  //
  //     const {
  //       questionnaireId,
  //       questionId,
  //       operator,
  //       startTimestamp,
  //       endTimestamp,
  //     } = placeholder;
  //
  //     if (questionnaireId) {
  //       return placeholder;
  //     }
  //     return null;
  //   }).filter((p) => p !== null);
  // }
}



