import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {AppQuestion, AppQuestionnaire} from '../../../../models/questionnaire';
import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {TranslatePipe} from '@ngx-translate/core';
import {QuestionnaireStateService} from '../../services/questionnaire-state.service';
import {QuestionComponent} from './question/question.component';
import {QuestionButtonComponent} from './question-button/question-button.component';

const QUESTION_TYPES = [
  {type: 'descriptive', icon: '', label: 'Descriptive', disabled: false},
  {type: 'info', icon: '', label: 'Info', disabled: false},
  {type: 'radio', icon: '', label: 'Radio', disabled: false},
  {type: 'yesno', icon: '', label: 'Yes/No', disabled: false},
  {type: 'checkbox', icon: '', label: 'Checkbox', disabled: false},
  {type: 'datetime', icon: '', label: 'DateTime', disabled: false},
  {type: 'slider', icon: '', label: 'Slider', disabled: false},
  {type: 'range', icon: '', label: 'Range', disabled: false},
  {type: 'range-info', icon: '', label: 'RangeInfo', disabled: false},
  {type: 'timed', icon: '', label: 'Timed', disabled: false},
  {type: 'audio', icon: '', label: 'Audio', disabled: false},
];

@Component({
  selector: 'app-questionnaire-questions',
  templateUrl: 'questionnaire-questions.component.html',
  imports: [
    CdkDropList,
    TranslatePipe,
    QuestionComponent,
    QuestionComponent,
    QuestionButtonComponent,
  ]
})
export class QuestionnaireQuestionsComponent implements OnInit {
  entity = input<AppQuestionnaire | undefined>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  valid = output<boolean>();

  questions: AppQuestion[] = [];

  ngOnInit() {
    this.questions = this.entity()?.questions?.map(q => ({...q, id: q.field_name}))?? [];
    const entity = this.entity();
    if (entity) {
    //   this.form.patchValue(entity);
    }
    //
    // this.valid.emit(this.form.valid);
    //
    // this.form.valueChanges.subscribe(change => {
    //   this.changeEvent.emit(change);
    //   this.valid.emit(this.form.valid);
    // });
  }

  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  protected addQuestion(type: string) {

    this.questions.push({
      id: `${Date.now()}`,
      field_name: '',
      field_label: {},
      field_type: type,
    });

    this.changeEvent.emit({questions: this.questions});
  }

  protected removeQuestion(index: number) {
    this.questions.splice(index, 1);

    this.changeEvent.emit({questions: this.questions});
  }

  protected onDrop($event: CdkDragDrop<any, any, any>) {

  }

  protected questionnaireStateService = inject(QuestionnaireStateService);

  selectedQuestionIndex = signal<number|undefined>(undefined);
  selectedQuestion = signal<AppQuestion|undefined>(undefined)

  protected selectQuestion(index: number, question: AppQuestion) {
    this.selectedQuestionIndex.set(index);
    this.selectedQuestion.set(question);
  }

  protected onQuestionChange(event: Partial<AppQuestion>) {
    const index = this.selectedQuestionIndex();

    if (index === undefined) return;
    this.questions = this.questions.map((q, i) => i === index ? {...q, ...event} : q);
    this.selectedQuestion.set(this.questions[index]);
  }
}
