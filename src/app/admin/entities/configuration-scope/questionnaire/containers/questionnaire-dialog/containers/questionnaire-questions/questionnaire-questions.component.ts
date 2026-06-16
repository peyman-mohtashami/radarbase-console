import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {AppQuestion, AppQuestionChoice, AppQuestionnaire} from '../../../../models/questionnaire';
import {CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {TranslatePipe} from '@ngx-translate/core';
import {QuestionnaireStateService} from '../../services/questionnaire-state.service';
import {QuestionComponent} from './question/question.component';
import {QuestionButtonComponent} from './question-button/question-button.component';
import {MatButton} from '@angular/material/button';

const QUESTION_TYPES = [
  {
    types: [
      {type: 'descriptive', icon: '', label: 'Descriptive', disabled: false},
      {type: 'info', icon: '', label: 'Info', disabled: false},
    ]
  },
  {
    types: [
      {type: 'radio', icon: '', label: 'Radio', disabled: false},
      {type: 'dropdown', icon: '', label: 'Dropdown', disabled: true},
      // {type: 'dropdownMultiSelect', icon: '', label: 'Multi-Select Dropdown', disabled: true},
      {type: 'yesno', icon: '', label: 'Yes/No', disabled: false},
      {type: 'checkbox', icon: '', label: 'Checkbox', disabled: false},
      {type: 'slider', icon: '', label: 'Slider', disabled: false},
      {type: 'range', icon: '', label: 'Range', disabled: false},
      {type: 'range-info', icon: '', label: 'RangeInfo', disabled: false},
      {type: 'rating', icon: '', label: 'Rating', disabled: true},
      {type: 'svgCheckbox', icon: '', label: 'SVG Checkbox', disabled: true},
    ]
  },
  {
    types: [
      {type: 'text', icon: '', label: 'Text', disabled: false},
      {type: 'note', icon: '', label: 'Note', disabled: false},
      {type: 'datetime', icon: '', label: 'DateTime', disabled: false},
      {type: 'duration', icon: '', label: 'Duration', disabled: false},
    ]
  },
  {
    types: [
      {type: 'web', icon: '', label: 'Web', disabled: false},
      {type: 'audio', icon: '', label: 'Audio', disabled: false},
      {type: 'fileUpload', icon: '', label: 'File Upload', disabled: true},
      {type: 'imagePicker', icon: '', label: 'Image Picker', disabled: true},
      {type: 'signature', icon: '', label: 'Signature', disabled: true},
      {type: 'videoPicker', icon: '', label: 'Video Picker', disabled: true},
      {type: 'sorting', icon: '', label: 'Sorting', disabled: true},
      {type: 'timed', icon: '', label: 'Timed', disabled: false},
    ]
  },
]
//   {type: 'descriptive', icon: '', label: 'Descriptive', disabled: false},
//   {type: 'info', icon: '', label: 'Info', disabled: false},
//   {type: 'radio', icon: '', label: 'Radio', disabled: false},
//   {type: 'yesno', icon: '', label: 'Yes/No', disabled: false},
//   {type: 'checkbox', icon: '', label: 'Checkbox', disabled: false},
//   {type: 'datetime', icon: '', label: 'DateTime', disabled: false},
//   {type: 'slider', icon: '', label: 'Slider', disabled: false},
//   {type: 'range', icon: '', label: 'Range', disabled: false},
//   {type: 'range-info', icon: '', label: 'RangeInfo', disabled: false},
//   {type: 'timed', icon: '', label: 'Timed', disabled: false},
//   {type: 'audio', icon: '', label: 'Audio', disabled: false},
// ];

@Component({
  selector: 'app-questionnaire-questions',
  templateUrl: 'questionnaire-questions.component.html',
  imports: [
    CdkDropList,
    TranslatePipe,
    QuestionComponent,
    QuestionComponent,
    QuestionButtonComponent,
    MatButton,
  ]
})
export class QuestionnaireQuestionsComponent implements OnInit {
  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  protected questionnaireStateService = inject(QuestionnaireStateService);

  entity = input<AppQuestionnaire | undefined>();

  changeEvent = output<Partial<AppQuestionnaire>>();
  validEvent = output<boolean>();

  questions: AppQuestion[] = [];
  selectedQuestionIndex = signal<number|undefined>(undefined);
  selectedQuestion = signal<AppQuestion|undefined>(undefined)

  ngOnInit() {
    this.questions = this.entity()?.questions?.map(q => ({...q, id: q.field_name, valid: true}))?? [];
  }

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

    this.validEvent.emit(this.questions.every(q => q.valid));
    this.changeEvent.emit({questions: this.questions});
  }

  protected selectQuestion(index: number, question: AppQuestion) {
    this.selectedQuestionIndex.set(index);
    this.selectedQuestion.set(question);
  }

  protected onQuestionChange(event: Partial<AppQuestion>) {
    console.log('Class: QuestionnaireQuestionsComponent, Function: onQuestionChange, Line 117 event' , event);
    const index = this.selectedQuestionIndex();

    if (index === undefined) return;
    this.questions = this.questions.map((q, i) => i === index ? {...q, ...event} : q);
    this.selectedQuestion.set(this.questions[index]);
    this.validEvent.emit(this.questions.every(q => q.valid));
    this.changeEvent.emit({questions: this.questions});
  }

  protected onDrop($event: CdkDragDrop<any, any, any>) {

  }
}
