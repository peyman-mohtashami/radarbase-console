import {
  Component,
  OnInit,
  output,
  input,
} from '@angular/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';

@Component({
  selector: 'app-info-question',
  imports: [
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
  ],
  templateUrl: './info-question.component.html'
})
export class InfoQuestionComponent implements OnInit {

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
