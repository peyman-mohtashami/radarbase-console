import {
  Component,
  output,
  input, OnInit
} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {TranslateLangPipe} from '../../../pipes/translate-lang.pipe';

@Component({
  selector: 'app-radio-question',
  imports: [
    MatRadioButton,
    MatRadioGroup,
    MatButton,
    ReplacePlaceholdersPipe,
    QuestionHeaderComponent,
    TranslateLangPipe,
  ],
  templateUrl: './radio-question.component.html'
})
export class RadioQuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isEditEnabled = true;
  valueChange = output<string | null>();

  ngOnInit(): void {
    this.isEditEnabled = this.questionnaire().editEnabled || !this.answer();
  }

  protected onInputChange(value: string | null) {
    this.valueChange.emit(value);
  }
}
