import {
  Component,
  input,
  OnInit,
  output
} from '@angular/core'
// // import { AppQuestion, QuestionType } from '../../../../core/app-lifecycle/questionnaire/models/question'
// import { RadioInputComponent } from './input-field/radio-input/radio-input.component'
// import { CheckboxInputComponent } from './input-field/checkbox-input/checkbox-input.component'
// import { RangeInputComponent } from './input-field/range-input/range-input.component'
// import { RangeInfoInputComponent } from './input-field/range-info-input/range-info-input.component'
// import { SliderInputComponent } from './input-field/slider-input/slider-input.component'
// import { InfoScreenComponent } from './input-field/info-screen/info-screen.component'
// import { TimedTestComponent } from './input-field/timed-test/timed-test.component'
// import { DescriptiveInputComponent } from './input-field/descriptive-input/descriptive-input.component'
// import { WebInputComponent } from './input-field/web-input/web-input.component'
// import { NotesInputComponent } from './input-field/notes-input/notes-input.component'
// import { YesnoInputComponent } from './input-field/yesno-input/yesno-input.component'
// import { DateInputComponent } from './input-field/date-input/date-input.component'
// import { TextInputComponent } from './input-field/text-input/text-input.component'
// import { TimeInputComponent } from './input-field/time-input/time-input.component'
// import { CalcInputComponent } from './input-field/calc-input/calc-input.component'
// // import { KeyboardEventType, NextButtonEventType } from '../../../../core/data-ingestion/usage/enums/events'
// import { ScrollableContentComponent } from './scrolable-content/scrollable-content.component'
// import { QuestionHeaderComponent } from './question-header/question-header.component'
// // import { AppProtocol } from '../../../../core/app-lifecycle/protocol/models/protocol'
// import { CheckboxSvgInputComponent } from './input-field/checkbox-svg-input/checkbox-svg-input.component'
// import {AudioInputComponent} from "./input-field/audio-input/audio-input.component";
// // import {AnswerWithTimeLog} from "../../../../core/data-ingestion/kafka/models/kafka";
// // import {SignatureInputComponent} from "./input-field/signature-input/signature-input.component";
// import {HealthInputComponent} from "./input-field/health-input/health-input.component";
import {AppQuestion, QuestionType} from '../models/question';
import {NextButtonEventType} from '../models/events';
import {AnswerWithTimeLog} from '../models/kafka';
import {ScrollableContentComponent} from './scrolable-content/scrollable-content.component';
import {QuestionHeaderComponent} from './question-header/question-header.component';
import {RadioInputComponent} from './input-field/radio-input/radio-input.component';
import {YesnoInputComponent} from './input-field/yesno-input/yesno-input.component';
import {CheckboxInputComponent} from './input-field/checkbox-input/checkbox-input.component';
import {TextInputComponent} from './input-field/text-input/text-input.component';
import {DescriptiveInputComponent} from './input-field/descriptive-input/descriptive-input.component';
import {RangeInputComponent} from './input-field/range-input/range-input.component';
import {RangeInfoInputComponent} from './input-field/range-info-input/range-info-input.component';
import {SliderInputComponent} from './input-field/slider-input/slider-input.component';
import {TimeInputComponent} from './input-field/time-input/time-input.component';
import {DateInputComponent} from './input-field/date-input/date-input.component';
import {NotesInputComponent} from './input-field/notes-input/notes-input.component';
import {InfoScreenComponent} from './input-field/info-screen/info-screen.component';

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
  imports: [
    ScrollableContentComponent,
    QuestionHeaderComponent,
    RadioInputComponent,
    YesnoInputComponent,
    CheckboxInputComponent,
    TextInputComponent,
    DescriptiveInputComponent,
    RangeInputComponent,
    RangeInfoInputComponent,
    SliderInputComponent,
    TimeInputComponent,
    DateInputComponent,
    NotesInputComponent,
    InfoScreenComponent,
    // RadioInputComponent,
    // CheckboxInputComponent,
    // RangeInputComponent,
    // RangeInfoInputComponent,
    // SliderInputComponent,
    // InfoScreenComponent,
    // TimedTestComponent,
    // TextInputComponent,
    // DescriptiveInputComponent,
    // WebInputComponent,
    // NotesInputComponent,
    // YesnoInputComponent,
    // DateInputComponent,
    // TextInputComponent,
    // TimeInputComponent,
    // CalcInputComponent,
    // ScrollableContentComponent,
    // QuestionHeaderComponent,
    // CheckboxSvgInputComponent,
    // AudioInputComponent,
    // // SignatureInputComponent,
    // HealthInputComponent,
  ],
})
export class QuestionComponent implements OnInit {

  question = input.required<AppQuestion>()
  // protocol = input.required<AppProtocol>()
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

  ngOnInit(): void {
    /** Set question edit-ability based on the assessment settings */
    this.question().editable = true; //this.protocol().editable

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
