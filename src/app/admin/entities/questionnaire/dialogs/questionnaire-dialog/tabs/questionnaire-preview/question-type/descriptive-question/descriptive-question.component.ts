import {
  Component,
  inject,
  OnInit,
  output,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';

@Component({
  selector: 'app-descriptive-question',
  imports: [
    QuestionHeaderComponent,
  ],
  templateUrl: './descriptive-question.component.html'
})
export class DescriptiveQuestionComponent implements OnInit {
  private dialogState = inject(QuestionnaireDialogStateService);

  entity = input.required<AppQuestion>();
  language = input(this.dialogState.questionnaire()!.defaultLanguage);
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
