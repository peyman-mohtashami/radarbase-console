import {
  Component, effect,
  input,
  OnInit,
  output, viewChild, ViewContainerRef,
  ChangeDetectionStrategy
} from '@angular/core'
import {AnswerWithTimeLog} from '../models/kafka';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../models/questionnaire';
import {QUESTION_COMPONENTS} from '../question-type/question-type.registry';
import {debounceTime} from 'rxjs/operators';
import {outputToObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [],
})
export class QuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<AnswerWithTimeLog | undefined>();
  answers = input.required<Record<string, AnswerWithTimeLog[]>>();

  answerEvent = output<AnswerWithTimeLog>()

  startTime = Date.now()

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
    componentRef.setInput('language', this.language());
    componentRef.setInput('entity', this.question()); //.instance.entity = this.question;
    componentRef.setInput('answer', this.answer());

    outputToObservable(componentRef.instance.previewValueChange)
      .pipe(debounceTime(300))
      .subscribe((value: any) => {
        this.emitAnswer(value);
      });
  }

  ngOnInit(): void {
    // this.question().editable = true; //this.protocol().editable
    this.startTime = Date.now()
  }

  emitAnswer(event: string | null): void {
    const { required_field, field_name, field_type } = this.question();
    // setTimeout(() => {
      const answer = this.createAnswer(field_name, field_type, event);
      this.answerEvent.emit(answer);
    // }, 200);
  }

  private createAnswer(id: string, type: string, value: string | null): AnswerWithTimeLog {
    return {
      id,
      type,
      value,
      startTime: this.startTime,
      endTime: Date.now()
    }
  }
}
