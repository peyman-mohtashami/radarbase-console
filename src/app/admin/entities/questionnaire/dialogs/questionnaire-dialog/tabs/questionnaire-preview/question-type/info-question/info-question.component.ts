import {
  Component,
  inject,
  OnInit,
  output,
  input,
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

@Component({
  selector: 'app-info-question',
  imports: [
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
  ],
  templateUrl: './info-question.component.html'
})
export class InfoQuestionComponent implements OnInit {
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
