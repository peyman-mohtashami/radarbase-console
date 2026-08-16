import {
  Component,
  inject,
  output,
  input
} from '@angular/core';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question/question-header/question-header.component';
import {JsonPipe} from '@angular/common';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

@Component({
  selector: 'app-text-question',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
    JsonPipe,
  ],
  templateUrl: './text-question.component.html'
})
export class TextQuestionComponent {
  private store = inject(QuestionnaireStore);

  entity = input.required<AppQuestion>();
  language = input(this.store.selected()!.defaultLanguage);
  answer = input.required<{ value: string}>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected error: string | null = null;

  protected onPreviewInputChange(event: Event | null) {
    if (event === null) {
      this.previewValueChange.emit(null);
      this.error = null;
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    this.validate(value);

    if (this.error === null) {
      this.previewValueChange.emit(value);
    } else {
      this.previewValueChange.emit(null);
    }
  }

  validate(valueString: string) {
    const regex = this.entity().text_validation_max;
    if (!regex) {
      this.error = null;
      return;
    }

    const isValid = matchesRegex(regex, valueString);

    if (!isValid) {
      this.error = "VALIDATION_ERROR";
      return;
    } else {
      this.error = null;
    }
  }
}


export function isValidRegex(pattern: string, flags = ''): boolean {
  try {
    new RegExp(pattern, flags);
    return true;
  } catch {
    return false;
  }
}

export function matchesRegex(pattern: string, value: string, flags = ''): boolean {
  try {
    const regex = new RegExp(pattern, flags);
    return regex.test(value);
  } catch {
    return false; // Invalid regex
  }
}


// email: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
// url: ^https?:\/\/([A-Za-z0-9-]+\.)+[A-Za-z]{2,}(\/.*)?$
// international phone: ^\+?[1-9]\d{7,14}$
// Dutch post code: ^\d{4}\s?[A-Za-z]{2}$
// Numbers only	^\d+$
// Letters only	^[A-Za-z]+$
// Letters & numbers	^[A-Za-z0-9]+$
// Username (3–20 chars)	^[A-Za-z0-9_]{3,20}$
// Password (min 8 chars, upper, lower, digit)	^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
// Hex color	`^#?([A-Fa-f0-9]{6}
// IPv4	`^((25[0-5]
