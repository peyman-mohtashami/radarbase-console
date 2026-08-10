import {Component, inject, output, input} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';

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
export class YesNoQuestionComponent {
  private dialogState = inject(QuestionnaireDialogStateService);

  entity = input.required<AppQuestion>();
  language = input(this.dialogState.questionnaire()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();
  protected yesNoOptions: {code: string, label: {[key: string]: string}}[] = [
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
  ]

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }
}
