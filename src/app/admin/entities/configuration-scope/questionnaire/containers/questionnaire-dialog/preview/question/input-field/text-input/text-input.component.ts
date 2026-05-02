import {Component, OnInit, output,} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {TranslateModule} from '@ngx-translate/core'
// import { KeyboardEventType } from '../../../../../../core/data-ingestion/usage/enums/events'
// import { Keyboard } from '@capacitor/keyboard'
import {BaseInputComponent} from '../base-input/base-input.component'
import {EMAIL_REGEX, isValidNHSNumber, URL_REGEX} from './validators'
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';


enum TEXT_INPUT_TYPE {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  INTEGER = 'integer',
  TEL = 'tel',
  URL = 'url',
  NHS_NUMBER = 'nhs'
}


enum TEXT_INPUT_PRESENTATION_TYPE {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url'
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
const validationRules: Record<TEXT_INPUT_TYPE, (value: string, min?: string, max?: string) => string | undefined> = {
  [TEXT_INPUT_TYPE.EMAIL]: (value: string) => EMAIL_REGEX.test(value) ? undefined : 'INVALID_EMAIL',
  [TEXT_INPUT_TYPE.URL]: (value: string) => URL_REGEX.test(value) ? undefined : 'INVALID_URL',
  [TEXT_INPUT_TYPE.NUMBER]: (value: string, min?: string, max?: string) => {
    const numValue = Number(value);
    if (min && numValue < +min) return 'MIN_VALUE';
    if (max && numValue > +max) return 'MAX_VALUE';
    return undefined;
  },
  [TEXT_INPUT_TYPE.INTEGER]: (value: string, min?: string, max?: string) => {
    const numValue = Number(value);
    if (min && numValue < +min) return 'MIN_VALUE';
    if (max && numValue > +max) return 'MAX_VALUE';
    return undefined;
  },
  [TEXT_INPUT_TYPE.NHS_NUMBER]: (value: string) => isValidNHSNumber(value) ? undefined : 'INVALID_NHS_NUMBER',
  [TEXT_INPUT_TYPE.TEL]: () => undefined, // Add validation if needed
  [TEXT_INPUT_TYPE.TEXT]: () => undefined, // Default case
};

/**
 * Component for handling text inputs in a question.
 * Manages user interactions and value changes.
 */
@Component({
  selector: 'app-text-input',
  templateUrl: 'text-input.component.html',
  imports: [FormsModule, TranslateModule, MatButton, MatFormField, MatInput]
})
export class TextInputComponent extends BaseInputComponent implements OnInit {
  /** Output event for value changes */
  keyboardEvent = output<string>()

  textInputType: any = TEXT_INPUT_PRESENTATION_TYPE.TEXT
  error?: string

  override ngOnInit() {
    super.ngOnInit()
    const { text_validation_type_or_show_slider_number: type } =
      this.question()
    this.textInputType = TEXT_INPUT_TYPES[type ?? TEXT_INPUT_TYPE.TEXT]
  }

  onInputStringChange(event: Event): void {
    // override onInputChange(event: string) {
    this.selectedValue = (event.target as HTMLInputElement).value;
    const {
      required_field,
      text_validation_min: min,
      text_validation_max: max,
      text_validation_type_or_show_slider_number: validationType
    } = this.question();

    let error: string | undefined;

    // Validate required field
    if (required_field !== 'false' && !this.selectedValue) {
      error = 'REQUIRED_FIELD';
    } else {
      const type: TEXT_INPUT_TYPE = TEXT_INPUT_TYPES[validationType ?? TEXT_INPUT_TYPE.TEXT];
      error = validationRules[type] ? validationRules[type](this.selectedValue, min, max) : undefined;
    }

    this.valueChange.emit(error ? null : this.selectedValue);
    this.error = error;
  }

  // async emitKeyboardEvent(value: any) {
  //   value = value.toLowerCase()
  //   if (value === KeyboardEventType.ENTER) {
  //     await Keyboard.hide()
  //   }
  //
  //   this.keyboardEvent.emit(value)
  // }
}
