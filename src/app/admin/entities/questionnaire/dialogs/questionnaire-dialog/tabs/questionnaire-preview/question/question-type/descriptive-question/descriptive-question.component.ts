import {
  Component,
  OnInit,
  output,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';

@Component({
  selector: 'app-descriptive-question',
  imports: [
    QuestionHeaderComponent,
  ],
  templateUrl: './descriptive-question.component.html'
})
export class DescriptiveQuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  valueChange = output<string | null>();

  ngOnInit(): void {
    this.onInputChange(`${Date.now()}`);
  }

  protected onInputChange(value: string | null) {
    this.valueChange.emit(value);
  }
}
