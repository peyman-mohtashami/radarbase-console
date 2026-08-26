import {Component, output, input, OnInit} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../pipes/replace-placeholders.pipe';

@Component({
  selector: 'app-yesno-question',
  imports: [
    MatButton,
    MatRadioButton,
    MatRadioGroup,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
  ],
  templateUrl: './yesno-question.component.html'
})
export class YesNoQuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isEditEnabled = true;
  valueChange = output<string | null>();
  protected yesNoOptions: {code: string, label: Record<string, string>}[] = [
    {
      code: '1',
      label: {
        en: 'Yes',
        it: 'Sì',
        nl: 'Ja',
        es: 'Sí',
        fr: 'Oui',
        pl: 'Tak',
        he: 'כן',
        da: 'Ja',
        de: 'Ja'
      }
    },
    {
      code: '0',
      label: {
        en: 'No',
        it: 'No',
        nl: 'Nee',
        es: 'No',
        fr: 'Non',
        pl: 'Nie',
        he: 'לא',
        da: 'Nej',
        de: 'Nein'
      }
    }
  ];

  ngOnInit(): void {
    this.isEditEnabled = this.questionnaire().editEnabled || !this.answer();
  }

  protected onInputChange(value: string | null) {
    this.valueChange.emit(value);
  }
}
