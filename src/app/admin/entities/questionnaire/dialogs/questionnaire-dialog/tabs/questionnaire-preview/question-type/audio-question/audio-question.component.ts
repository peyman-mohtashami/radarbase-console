import {
  Component,
  inject,
  OnInit,
  output,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

@Component({
  selector: 'app-audio-question',
  imports: [
    QuestionHeaderComponent,
  ],
  templateUrl: './audio-question.component.html'
})
export class AudioQuestionComponent implements OnInit {

  private store = inject(QuestionnaireStore);

  entity = input.required<AppQuestion>();
  language = input(this.store.selected()!.defaultLanguage);
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
