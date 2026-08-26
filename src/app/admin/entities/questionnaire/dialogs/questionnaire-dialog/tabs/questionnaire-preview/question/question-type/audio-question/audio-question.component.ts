import {
  Component,
  OnInit,
  output,
  input
} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';

@Component({
  selector: 'app-audio-question',
  imports: [
    QuestionHeaderComponent,
  ],
  templateUrl: './audio-question.component.html'
})
export class AudioQuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isEditEnabled = true;
  valueChange = output<string | null>();

  ngOnInit(): void {
    this.onInputChange(`${Date.now()}`);
    this.isEditEnabled = this.questionnaire().editEnabled || !this.answer();
  }

  protected onInputChange(value: string | null) {
    this.valueChange.emit(value);
  }
}
