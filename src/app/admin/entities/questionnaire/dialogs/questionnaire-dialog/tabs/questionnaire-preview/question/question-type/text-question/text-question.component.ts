import {
  Component,
  output,
  input, OnInit
} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../question-header/question-header.component';

@Component({
  selector: 'app-text-question',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
  ],
  templateUrl: './text-question.component.html'
})
export class TextQuestionComponent implements OnInit {

  question = input.required<AppQuestion>();
  questionnaire = input.required<AppQuestionnaire>();
  language = input.required<AppQuestionnaireLanguage>();
  answer = input.required<{ value: string}>();

  protected isEditEnabled = true;
  valueChange = output<string | null>();

  protected error: string | null = null;

  ngOnInit(): void {
    this.isEditEnabled = this.questionnaire().editEnabled || !this.answer() || !this.answer().value;
  }

  protected onInputChange(event: Event | null) {
    if (event === null) {
      this.valueChange.emit(null);
      this.error = null;
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    this.validate(value);

    if (this.error === null) {
      this.valueChange.emit(value);
    } else {
      this.valueChange.emit(null);
    }
  }

  validate(valueString: string) {
    const regex = this.question().text_validation_min;
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
