import {
  Component, effect,
  input,
  OnInit,
  output, viewChild, ViewContainerRef
} from '@angular/core'
import {QuestionType} from '../models/question';
import {NextButtonEventType} from '../models/events';
import {AnswerWithTimeLog} from '../models/kafka';
import {AppQuestion} from '../../../../../models/questionnaire';
import {QUESTION_COMPONENTS} from '../../../components/question-type/question-type.registry';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {debounceTime} from 'rxjs/operators';
import {outputToObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
  imports: [],
})
export class QuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  language = input.required<RadarOption>();
  answer = input.required<AnswerWithTimeLog | undefined>();
  answers = input.required<Record<string, AnswerWithTimeLog[]>>();

  answerEvent = output<AnswerWithTimeLog>()
  nextActionEvent = output<NextButtonEventType>()

  startTime = Date.now()

  private readonly AUTO_NEXT_QUESTION_TYPES: QuestionType[] = [
    QuestionType.RADIO,
    QuestionType.YESNO,
    QuestionType.CALCULATION,
    QuestionType.AUDIO,
    QuestionType.RANGE,
    QuestionType.TIMED
  ]

  host = viewChild('questionHost', { read: ViewContainerRef });
  constructor() {
    effect(() => this.loadQuestionEditor());
  }

  private loadQuestionEditor(): void {
    const host = this.host();
    if (!host) return;

    host.clear();
    const componentType = QUESTION_COMPONENTS[this.question().field_type];
    const componentRef = host.createComponent(componentType);
    componentRef.instance.type = 'preview';
    componentRef.instance.language = this.language;
    componentRef.instance.entity = this.question;
    componentRef.instance.answer = this.answer;

    outputToObservable(componentRef.instance.previewValueChange)
      .pipe(debounceTime(300))
      .subscribe((value: any) => {
        console.log('Child emitted value:', value);
        this.emitAnswer(value);
      });
    // componentRef.instance.previewValueChange
    //   // .pipe(
    //   // debounceTime(300),
    // // )
    //   .subscribe((value: any) => {
    //   console.log('Child emitted value:', value);
    //   this.emitAnswer(value);
    //   // this.selectionChange.emit(value);
    // });
  }

  ngOnInit(): void {
    /** Set question edit-ability based on the assessment settings */
    // this.question().editable = true; //this.protocol().editable

    this.startTime = Date.now()

    const { required_field, field_name, field_type } = this.question()

    if (required_field !== 'false') {
      if (this.answer()) {
        this.nextActionEvent.emit(NextButtonEventType.ENABLE)
      }
    } else {
      if (this.answer() === null) {
        this.answerEvent.emit(this.createAnswer(field_name, field_type, null))
      }
      this.nextActionEvent.emit(NextButtonEventType.ENABLE)
    }
  }

  /**
   * Emits an answer event when the user interacts with the question.
   * @param event The user's response value.
   */
  emitAnswer(event: string | null): void {
    const { required_field, field_name, field_type } = this.question()
    setTimeout(() => {
      if (required_field !== 'false') {
        if (event === undefined || event === null || event === '') {
          const answer = this.createAnswer(field_name, field_type, event)
          this.answerEvent.emit(answer)
          this.nextActionEvent.emit(NextButtonEventType.DISABLE)
          return
        }

        const answer = this.createAnswer(field_name, field_type, event)
        this.answerEvent.emit(answer)

        this.nextActionEvent.emit(
          this.isAutoNext() || this.question().field_type === 'calc'
            ? NextButtonEventType.ENABLE //NextButtonEventType.AUTO
            : NextButtonEventType.ENABLE
        )
      } else {
        const answer = this.createAnswer(field_name, field_type, event)
        this.answerEvent.emit(answer)
        if (
          event !== undefined &&
          event !== null &&
          event !== '' &&
          this.isAutoNext()
        ) {
          this.nextActionEvent.emit(NextButtonEventType.ENABLE)

          // this.nextActionEvent.emit(NextButtonEventType.AUTO)
        } else {
          this.nextActionEvent.emit(NextButtonEventType.ENABLE)
        }
      }
    }, 200)
  }

  /**
   * Handles keyboard input for navigation.
   * @param event The keyboard event type.
   */
  // onKeyboardEvent(event: string): void {
  //   if (event === KeyboardEventType.ENTER) {
  //     this.nextActionEvent.emit(NextButtonEventType.AUTO)
  //   }
  // }

  /**
   * Determines if the question should auto-advance based on type and assessment settings.
   */
  private isAutoNext(): boolean {
    // return ((this.protocol().autoNext ?? false) && this.AUTO_NEXT_QUESTION_TYPES.includes(
    //   this.question().field_type as QuestionType
    // ))
    return (this.AUTO_NEXT_QUESTION_TYPES.includes(
      this.question().field_type as QuestionType
    ))
  }

  /**
   * Creates an answer object with the provided details.
   * @param id The question field name.
   * @param type The question type.
   * @param value The user's response.
   */
  private createAnswer(
    id: string,
    type: string,
    value: string | null
  ): AnswerWithTimeLog {
    return {
      id,
      type,
      value,
      startTime: this.startTime,
      endTime: Date.now()
    }
  }
}
