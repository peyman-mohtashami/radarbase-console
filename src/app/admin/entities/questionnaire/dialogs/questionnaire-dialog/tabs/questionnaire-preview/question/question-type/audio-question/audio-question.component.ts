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
  selector: 'app-audio-question',
  imports: [
    QuestionHeaderComponent,
  ],
  templateUrl: './audio-question.component.html'
})
export class AudioQuestionComponent implements OnInit {

  entity = input.required<AppQuestion>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  ngOnInit(): void {
    this.onPreviewInputChange(`${Date.now()}`);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
