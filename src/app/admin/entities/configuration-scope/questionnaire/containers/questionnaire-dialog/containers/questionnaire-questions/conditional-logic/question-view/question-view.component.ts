import {Component, inject, input, OnInit, output} from '@angular/core'
// import {AppQuestion} from '../../../../models/questionnaire';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
// import {QuestionnaireStateService} from '../../services/questionnaire-state.service';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ReplacePlaceholdersPipe} from '../../../questionnaire-preview/pipes/replace-placeholders.pipe';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireStateService} from '../../../../services/questionnaire-state.service';
// import {ReplacePlaceholdersPipe} from '../../questionnaire-preview/pipes/replace-placeholders.pipe';

enum TEXT_INPUT_PRESENTATION_TYPE {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url'
}

enum TEXT_INPUT_TYPE {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  INTEGER = 'integer',
  TEL = 'tel',
  URL = 'url',
  NHS_NUMBER = 'nhs'
}

const TEXT_INPUT_TYPES: Record<string, any> = {
  [TEXT_INPUT_TYPE.TEXT]: TEXT_INPUT_PRESENTATION_TYPE.TEXT,
  [TEXT_INPUT_TYPE.EMAIL]: TEXT_INPUT_PRESENTATION_TYPE.EMAIL,
  [TEXT_INPUT_TYPE.NUMBER]: TEXT_INPUT_PRESENTATION_TYPE.NUMBER,
  [TEXT_INPUT_TYPE.INTEGER]: TEXT_INPUT_PRESENTATION_TYPE.NUMBER,
  [TEXT_INPUT_TYPE.TEL]: TEXT_INPUT_PRESENTATION_TYPE.TEL,
  [TEXT_INPUT_TYPE.URL]: TEXT_INPUT_PRESENTATION_TYPE.URL,
  [TEXT_INPUT_TYPE.NHS_NUMBER]: TEXT_INPUT_PRESENTATION_TYPE.NUMBER,
}


@Component({
  selector: 'app-question-view',
  templateUrl: 'question-view.component.html',
  imports: [
    MatRadioButton,
    MatRadioGroup,
    MatButton,
    MatSlider,
    MatSliderThumb,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatDatepicker,
    MatDatepickerInput,
    MatHint,
    MatLabel,
    ReplacePlaceholdersPipe,
  ],
})
export class QuestionViewComponent implements OnInit {

  question = input.required<AppQuestion>();
  conditionalLogicItem = input<ConditionalLogicItem>();
  questionnaireStateService = inject(QuestionnaireStateService);
  selectionChange = output<any>();

  textInputType: any = TEXT_INPUT_PRESENTATION_TYPE.TEXT;
  rangeItems: string[] = [];

  ngOnInit() {
    const { text_validation_type_or_show_slider_number: type } =
      this.question();
    this.textInputType = TEXT_INPUT_TYPES[type ?? TEXT_INPUT_TYPE.TEXT];

    const range = this.question().range;
    if (range) {
      const { min, max, step } = range;
      this.rangeItems = Array.from(
        { length: (max - min) / (step ?? 1) + 1 },
        (_, i) => `${min + i * (step ?? 1)}`
      );
    }
  }

  protected onInputChange(value: any) {
    this.selectionChange.emit(value);
  }

  protected onInputStringChange(event: Event) {
    this.selectionChange.emit((event.target as HTMLInputElement).value);
  }

  protected onDateChange(event: MatDatepickerInputEvent<any>) {
    this.onInputChange(event.value)
  }
}
